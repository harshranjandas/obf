import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/middleware'

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const eventType = searchParams.get('eventType')
    const page = searchParams.get('page')

    const where: any = {}
    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) where.createdAt.gte = new Date(startDate)
      if (endDate) where.createdAt.lte = new Date(endDate)
    }
    if (eventType) where.eventType = eventType
    if (page) where.page = page

    const analytics = await prisma.analytics.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 1000,
    })

    // Aggregate statistics
    const stats = {
      totalEvents: analytics.length,
      pageViews: analytics.filter((a: any) => a.eventType === 'page_view').length,
      clicks: analytics.filter((a: any) => a.eventType === 'click').length,
      formSubmits: analytics.filter((a: any) => a.eventType === 'form_submit').length,
      topPages: analytics
        .filter((a: any) => a.page)
        .reduce((acc: any, a: any) => {
          acc[a.page!] = (acc[a.page!] || 0) + 1
          return acc
        }, {}),
      topCountries: analytics
        .filter((a: any) => a.country)
        .reduce((acc: any, a: any) => {
          acc[a.country!] = (acc[a.country!] || 0) + 1
          return acc
        }, {}),
    }

    return NextResponse.json({ analytics, stats })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
