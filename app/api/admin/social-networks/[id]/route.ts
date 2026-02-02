import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/middleware'
import { z } from 'zod'

const updateSocialNetworkSchema = z.object({
  name: z.string().min(1).optional(),
  url: z.string().url().optional(),
  icon: z.string().optional(),
  enabled: z.boolean().optional(),
  order: z.number().optional(),
})

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
    const data = updateSocialNetworkSchema.parse(body)

    const updateData: any = {}
    if (data.name !== undefined) updateData.name = data.name
    if (data.url !== undefined) updateData.url = data.url
    if (data.icon !== undefined) updateData.icon = data.icon
    if (data.enabled !== undefined) updateData.enabled = data.enabled
    if (data.order !== undefined) updateData.order = data.order

    const network = await prisma.socialNetwork.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(network)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
    }
    console.error('Error updating social network:', error)
    return NextResponse.json({ error: 'Failed to update social network' }, { status: 500 })
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
    await prisma.socialNetwork.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting social network:', error)
    return NextResponse.json({ error: 'Failed to delete social network' }, { status: 500 })
  }
}
