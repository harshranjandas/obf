import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/middleware'
import { z } from 'zod'

const updateJobSchema = z.object({
  title: z.string().min(1).optional(),
  subTitle: z.string().optional(),
  location: z.string().min(1).optional(),
  locationType: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  logo: z.string().optional(),
  theRole: z.string().min(1).optional(),
  whatYouDo: z.array(z.string()).optional(),
  whatWereLookingFor: z.array(z.string()).optional(),
  preferredExperience: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        applications: true,
      },
    })

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error fetching job:', error)
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const data = updateJobSchema.parse(body)

    const updateData: any = {}
    if (data.title !== undefined) updateData.title = data.title
    if (data.subTitle !== undefined) updateData.subTitle = data.subTitle
    if (data.location !== undefined) updateData.location = data.location
    if (data.locationType !== undefined) updateData.locationType = data.locationType
    if (data.type !== undefined) updateData.type = data.type
    if (data.logo !== undefined) updateData.logo = data.logo
    if (data.theRole !== undefined) updateData.theRole = data.theRole
    if (data.whatYouDo !== undefined) updateData.whatYouDo = data.whatYouDo
    if (data.whatWereLookingFor !== undefined) updateData.whatWereLookingFor = data.whatWereLookingFor
    if (data.preferredExperience !== undefined) updateData.preferredExperience = data.preferredExperience
    if (data.published !== undefined) updateData.published = data.published
    if (data.featured !== undefined) updateData.featured = data.featured
    if (data.order !== undefined) updateData.order = data.order

    const job = await prisma.job.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(job)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
    }
    console.error('Error updating job:', error)
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.job.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting job:', error)
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 })
  }
}
