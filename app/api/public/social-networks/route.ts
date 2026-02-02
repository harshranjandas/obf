import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const networks = await prisma.socialNetwork.findMany({
      where: { enabled: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(networks)
  } catch (error) {
    console.error('Error fetching social networks:', error)
    return NextResponse.json({ error: 'Failed to fetch social networks' }, { status: 500 })
  }
}
