import { NextResponse, NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Public GET endpoint for frontend - fetches published jobs with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)

    const payload = await getPayload({ config })
    
    const jobs = await payload.find({
      collection: 'jobs',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: 'displayOrder', // Ascending order
      page,
      limit,
      depth: 0,
    })

    return NextResponse.json({
      docs: jobs.docs || [],
      totalDocs: jobs.totalDocs,
      totalPages: jobs.totalPages,
      page: jobs.page,
      hasNextPage: jobs.hasNextPage,
      hasPrevPage: jobs.hasPrevPage,
      nextPage: jobs.nextPage,
      prevPage: jobs.prevPage,
    })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}
