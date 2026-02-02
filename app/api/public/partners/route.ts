import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Public GET endpoint for frontend - fetches all partners ordered by order field
export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    const partners = await payload.find({
      collection: 'partners',
      sort: 'order', // Ascending order by default
      limit: 100, // Get all partners
      depth: 1, // Include relations (for image upload)
      where: {
        // You can add filters here if needed (e.g., only published partners)
      },
    })

    return NextResponse.json(partners.docs || [])
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 })
  }
}
