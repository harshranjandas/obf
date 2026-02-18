import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Map upload filenames to public folder paths for Vercel deployment
const uploadToPublicMap: Record<string, string> = {
  'iamai.webp': '/images/partners/iamai.jpg',
  'T9L.webp': '/images/partners/t9l.jpg',
  'interviews.webp': '/images/interviews.webp',
  'podcasts.webp': '/images/podcasts.webp',
  'events.webp': '/images/events.webp',
  'obf-intro.mp3': '/audio/obf-intro.mp3',
}

// Prefer static path (file in public/); else rewrite upload to public path or keep upload URL
function getPartnerImage(partner: {
  imageStaticPath?: string | null
  image?: { filename?: string; url?: string } | null
}): { url: string } | { filename?: string; url?: string } | null {
  if (partner.imageStaticPath && typeof partner.imageStaticPath === 'string') {
    const path = partner.imageStaticPath.startsWith('/') ? partner.imageStaticPath : `/${partner.imageStaticPath}`
    return { url: path }
  }
  const image = partner.image
  if (!image) return null
  if (typeof image === 'object' && image.filename) {
    const publicPath = uploadToPublicMap[image.filename]
    if (publicPath) return { ...image, url: publicPath }
  }
  return image
}

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

    type PartnerDoc = { imageStaticPath?: string | null; image?: { filename?: string; url?: string } | null }
    const docs = (partners.docs || []) as PartnerDoc[]
    const partnersWithFixedUrls = docs.map((partner) => ({
      ...partner,
      image: getPartnerImage(partner),
    }))

    return NextResponse.json(partnersWithFixedUrls)
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 })
  }
}
