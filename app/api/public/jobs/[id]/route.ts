import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Public GET endpoint for frontend - fetches a single job by ID
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const payload = await getPayload({ config })
    
    // Try to find by ID (numeric)
    const numericId = parseInt(id, 10)
    
    if (!isNaN(numericId)) {
      const job = await payload.findByID({
        collection: 'jobs',
        id: numericId,
        depth: 0,
      })

      if (job && job.status === 'published') {
        return NextResponse.json(job)
      }
    }

    return NextResponse.json({ error: 'Job not found' }, { status: 404 })
  } catch (error) {
    console.error('Error fetching job:', error)
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 })
  }
}
