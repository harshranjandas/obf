import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/middleware'
import { z } from 'zod'

const jobSchema = z.object({
  title: z.string().min(1),
  subTitle: z.string().optional(),
  location: z.string().min(1),
  locationType: z.string().min(1),
  type: z.string().min(1),
  logo: z.string().optional(),
  theRole: z.string().min(1),
  whatYouDo: z.array(z.string()),
  whatWereLookingFor: z.array(z.string()),
  preferredExperience: z.array(z.string()),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const jobs = await prisma.job.findMany({
      include: {
        applications: {
          select: {
            id: true,
            fullName: true,
            email: true,
            status: true,
            createdAt: true,
          },
        },
      },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const data = jobSchema.parse(body)

    const job = await prisma.job.create({
      data: {
        title: data.title,
        subTitle: data.subTitle,
        location: data.location,
        locationType: data.locationType,
        type: data.type,
        logo: data.logo,
        theRole: data.theRole,
        whatYouDo: data.whatYouDo,
        whatWereLookingFor: data.whatWereLookingFor,
        preferredExperience: data.preferredExperience,
        published: data.published ?? false,
        featured: data.featured ?? false,
        order: data.order ?? 0,
      },
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
    }
    console.error('Error creating job:', error)
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
  }
}
