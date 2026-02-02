import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const trackSchema = z.object({
  eventType: z.string().min(1),
  page: z.string().optional(),
  referrer: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = trackSchema.parse(body)

    const userAgent = request.headers.get('user-agent') || undefined
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               undefined

    await prisma.analytics.create({
      data: {
        eventType: data.eventType,
        page: data.page,
        referrer: data.referrer,
        userAgent,
        ip,
        metadata: data.metadata || {},
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
    }
    console.error('Error tracking analytics:', error)
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 })
  }
}
