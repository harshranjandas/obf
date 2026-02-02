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
  'podcast-gradient.png': '/images/podcast-gradient.png',
  'event-gradient.png': '/images/event-gradient.png',
  'interview-gradient.png': '/images/interview-gradient.png',
  'obf-intro.mp3': '/audio/obf-intro.mp3',
}

// Helper function to get image URL from Payload upload
function getImageUrl(upload: any): string | null {
  if (!upload) return null
  if (typeof upload === 'string') {
    if (upload.startsWith('/')) return upload
    if (upload.startsWith('http')) {
      try {
        const url = new URL(upload)
        return url.pathname
      } catch {
        return upload
      }
    }
    return `/${upload}`
  }
  if (typeof upload === 'object') {
    // Check if we have a mapping for this filename
    if (upload.filename && uploadToPublicMap[upload.filename]) {
      return uploadToPublicMap[upload.filename]
    }
    if (upload.url) {
      if (upload.url.startsWith('http')) {
        try {
          const url = new URL(upload.url)
          return url.pathname
        } catch {
          return upload.url
        }
      }
      if (upload.url.startsWith('/')) {
        return upload.url
      }
      return `/${upload.url}`
    }
    if (upload.filename) {
      // Check mapping again for filenames
      return uploadToPublicMap[upload.filename] || `/api/uploads/file/${upload.filename}`
    }
  }
  return null
}

// Public GET endpoint for frontend - fetches homepage settings
export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    const settings = await payload.find({
      collection: 'homepage-settings',
      limit: 1,
      depth: 2, // Include relations (for images and uploads)
    })

    // Default values from current homepage
    const defaultIntroContent = {
      root: {
        children: [
          {
            children: [{ text: "The 21st century is poised to be defined by India's ascent— a century where the nation doesn't just rise but soars." }],
            type: 'paragraph',
          },
          {
            children: [{ text: "India stands at the cusp of a transformative era, emerging as a beacon of innovation, collaboration and growth on the global stage." }],
            type: 'paragraph',
          },
          {
            children: [{ text: 'A young, forward-looking workforce, fueled by a culture of ingenuity and collaboration, is powering a wave of progress that resonates far beyond its borders.' }],
            type: 'paragraph',
          },
          {
            children: [{ text: 'One Big Future (OBF) is built to capture this momentum.' }],
            type: 'paragraph',
          },
        ],
      },
    }

    const defaultShareVisionDescription = {
      root: {
        children: [
          {
            children: [
              { text: 'We invite you to explore the ideas, ambitions, and forces driving India toward its next horizon. ' },
              { text: '\n', type: 'linebreak' },
              { text: 'Contact us to share your ideas.' },
            ],
            type: 'paragraph',
          },
        ],
      },
    }

    // Helper to convert plain text with \n to rich text format
    const textToRichText = (text: string) => {
      const lines = text.split('\n')
      return {
        root: {
          children: lines.map((line) => ({
            children: [{ text: line }],
            type: 'paragraph',
          })),
        },
      }
    }

    const defaultComingSoonCards = [
      {
        title: 'Interviews',
        description: textToRichText('Vision interviews of\nluminaries from\nvaried fields'),
        image: '/images/interviews.webp',
        backgroundColor: '#FFF1E7',
        textColor: '#EF671F',
        backgroundImage: '/images/interview-gradient.png',
      },
      {
        title: 'Podcasts',
        description: textToRichText('Podcasts featuring\ninsightful discussions on\nIndia\'s growth story'),
        image: '/images/podcasts.webp',
        backgroundColor: '#F2F2F2',
        textColor: '#535353',
        backgroundImage: '/images/podcast-gradient.png',
      },
      {
        title: 'Events',
        description: textToRichText('Events to engage,\nlearn, and collaborate\nwith leaders'),
        image: '/images/events.webp',
        backgroundColor: '#D4EBE0',
        textColor: '#046A38',
        backgroundImage: '/images/event-gradient.png',
      },
    ]

    const defaultSocialNetworks = [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/showcase/one-big-future/about/',
        enabled: true,
        order: 0,
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/one_big_future/',
        enabled: true,
        order: 1,
      },
      {
        name: 'YouTube',
        url: 'https://www.youtube.com/@OneBigFuture',
        enabled: true,
        order: 2,
      },
      {
        name: 'X (Formerly Twitter)',
        url: 'https://x.com/onebigfuture',
        enabled: true,
        order: 3,
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/profile.php?id=61586251529727',
        enabled: true,
        order: 4,
      },
    ]

    if (settings.docs.length === 0) {
      // Return default settings if none exist
      return NextResponse.json({
        introHeading: 'India In The 21st Century',
        introContent: defaultIntroContent,
        audioEnabled: true,
        audioUrl: '/audio/obf-intro.mp3',
        audioName: 'OBF Podcast',
        comingSoonLabel: 'Explore One Big future',
        comingSoonHeading: 'Coming Soon',
        comingSoonCards: defaultComingSoonCards,
        shareVisionLabel: 'SHARE YOUR VISION',
        shareVisionHeading: "What Is Your Dream For India's Future?",
        shareVisionDescription: defaultShareVisionDescription,
        shareVisionButtonText: 'Contact us',
        shareVisionButtonLink: '/contact-us',
        address: 'C7, SDA Commercial Complex\nOpposite IIT Campus\nNew Delhi 110016, India',
        socialNetworks: defaultSocialNetworks,
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
      })
    }

    const doc = settings.docs[0] as any

    // Get the audio URL
    let audioUrl = '/audio/obf-intro.mp3'
    if (doc.audioFile) {
      const url = getImageUrl(doc.audioFile)
      if (url) audioUrl = url
    }

    // Process coming soon cards
    const comingSoonCards = (doc.comingSoonCards || defaultComingSoonCards).map((card: any) => {
      // Handle description - if it's a string (legacy), convert to rich text; otherwise use as-is
      let description = card.description
      if (typeof description === 'string') {
        description = textToRichText(description)
      } else if (!description) {
        description = textToRichText('')
      }
      
      return {
        title: card.title || '',
        description,
        image: getImageUrl(card.image) || card.image || '',
        backgroundColor: card.backgroundColor || '#FFF1E7',
        textColor: card.textColor || '#EF671F',
        backgroundImage: getImageUrl(card.backgroundImage) || card.backgroundImage || null,
      }
    })

    // Process social networks
    const socialNetworks = (doc.socialNetworks || defaultSocialNetworks).map((network: any) => ({
      name: network.name || '',
      url: network.url || '',
      enabled: network.enabled !== undefined ? network.enabled : true,
      order: network.order || 0,
    })).sort((a: any, b: any) => a.order - b.order)

    return NextResponse.json({
      introHeading: doc.introHeading || 'India In The 21st Century',
      introContent: doc.introContent || defaultIntroContent,
      audioEnabled: doc.audioEnabled ?? true,
      audioUrl,
      audioName: doc.audioName || 'OBF Podcast',
      comingSoonLabel: doc.comingSoonLabel || 'Explore One Big future',
      comingSoonHeading: doc.comingSoonHeading || 'Coming Soon',
      comingSoonCards,
      shareVisionLabel: doc.shareVisionLabel || 'SHARE YOUR VISION',
      shareVisionHeading: doc.shareVisionHeading || "What Is Your Dream For India's Future?",
      shareVisionDescription: doc.shareVisionDescription || defaultShareVisionDescription,
      shareVisionButtonText: doc.shareVisionButtonText || 'Contact us',
      shareVisionButtonLink: doc.shareVisionButtonLink || '/contact-us',
      address: doc.address || 'C7, SDA Commercial Complex\nOpposite IIT Campus\nNew Delhi 110016, India',
      socialNetworks,
      seoTitle: doc.seoTitle || '',
      seoDescription: doc.seoDescription || '',
      seoKeywords: doc.seoKeywords || '',
    })
  } catch (error) {
    console.error('Error fetching homepage settings:', error)
    // Return defaults on error
    return NextResponse.json({
      introHeading: 'India In The 21st Century',
      introContent: null,
      audioEnabled: true,
      audioUrl: '/audio/obf-intro.mp3',
      audioName: 'OBF Podcast',
      comingSoonLabel: 'Explore One Big future',
      comingSoonHeading: 'Coming Soon',
      comingSoonCards: [],
      shareVisionLabel: 'SHARE YOUR VISION',
      shareVisionHeading: "What Is Your Dream For India's Future?",
      shareVisionDescription: null,
      shareVisionButtonText: 'Contact us',
      shareVisionButtonLink: '/contact-us',
      address: 'C7, SDA Commercial Complex\nOpposite IIT Campus\nNew Delhi 110016, India',
      socialNetworks: [],
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
    })
  }
}
