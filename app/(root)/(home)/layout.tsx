import type { Metadata } from 'next'

// Avoid build-time fetch to localhost (no server during build)
export const dynamic = 'force-dynamic'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3002')

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(`${baseUrl}/api/public/homepage-settings`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return {}
    const data = await res.json()
    const title = data.seoTitle?.trim()
    const description = data.seoDescription?.trim()
    const keywords = data.seoKeywords?.trim()
    if (!title && !description && !keywords) return {}
    return {
      ...(title && { title }),
      ...(description && { description }),
      ...(keywords && { keywords: keywords.split(',').map((k: string) => k.trim()).filter(Boolean) }),
      openGraph: {
        ...(title && { title }),
        ...(description && { description }),
      },
      twitter: {
        ...(title && { title }),
        ...(description && { description }),
      },
    }
  } catch {
    return {}
  }
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
