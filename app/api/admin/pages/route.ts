import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/middleware'
import { z } from 'zod'

const pageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  content: z.string().optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
    ogType: z.string().optional(),
    twitterCard: z.string().optional(),
    twitterTitle: z.string().optional(),
    twitterDescription: z.string().optional(),
    twitterImage: z.string().optional(),
    canonicalUrl: z.string().optional(),
  }).optional(),
})

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const pages = await prisma.page.findMany({
      include: { seo: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await request.json()
    const data = pageSchema.parse(body)

    const page = await prisma.page.create({
      data: {
        slug: data.slug,
        title: data.title,
        content: data.content,
        published: data.published ?? false,
        featured: data.featured ?? false,
        order: data.order ?? 0,
        seo: data.seo ? {
          create: data.seo,
        } : undefined,
      },
      include: { seo: true },
    })

    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
    }
    console.error('Error creating page:', error)
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}
