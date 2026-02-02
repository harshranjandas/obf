import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/middleware'
import { z } from 'zod'

const socialNetworkSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  icon: z.string().optional(),
  enabled: z.boolean().optional(),
  order: z.number().optional(),
})

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const networks = await prisma.socialNetwork.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(networks)
  } catch (error) {
    console.error('Error fetching social networks:', error)
    return NextResponse.json({ error: 'Failed to fetch social networks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const data = socialNetworkSchema.parse(body)

    const network = await prisma.socialNetwork.create({
      data: {
        name: data.name,
        url: data.url,
        icon: data.icon,
        enabled: data.enabled ?? true,
        order: data.order ?? 0,
      },
    })

    return NextResponse.json(network, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
    }
    console.error('Error creating social network:', error)
    return NextResponse.json({ error: 'Failed to create social network' }, { status: 500 })
  }
}
