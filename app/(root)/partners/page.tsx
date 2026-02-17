import WebsiteIcon from '@/components/icons/WebsiteIcon';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Partners - One Big Future',
  description: 'Partners - One Big Future',
  openGraph: {
    title: 'Partners - One Big Future',
    description: 'Partners - One Big Future',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'One Big Future Partners',
      },
    ],
    type: 'website',
    siteName: 'One Big Future',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partners - One Big Future',
    description: 'Partners - One Big Future',
    images: ['/og-image.jpg'],
  },
};

interface Partner {
  id: string;
  name: string;
  fullName?: string;
  bio?: string;
  image?: {
    id: string;
    url: string;
    filename: string;
  } | string;
  website?: string;
  order?: number;
}

async function getPartners(): Promise<Partner[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3002');
    const response = await fetch(`${baseUrl}/api/public/partners`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      console.error('Failed to fetch partners:', response.statusText);
      return [];
    }

    const partners = await response.json();
    return partners || [];
  } catch (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
}

export default async function PartnersPage() {
  const partners = await getPartners();

  // Get image URL helper - use relative URLs for Next.js Image component
  const getImageUrl = (image: Partner['image']): string => {
    if (!image) return '/images/partners/default.jpg';
    if (typeof image === 'string') {
      // If it's already a relative path, use it
      if (image.startsWith('/')) return image;
      // If it's absolute, extract the path
      try {
        const url = new URL(image);
        return url.pathname;
      } catch {
        return image;
      }
    }
    if (typeof image === 'object') {
      // Payload upload object - can have url or filename
      if (image.url) {
        // Extract relative path from URL
        if (image.url.startsWith('http')) {
          try {
            const url = new URL(image.url);
            return url.pathname;
          } catch {
            return image.url;
          }
        }
        // If URL starts with /, it's already a relative path
        if (image.url.startsWith('/')) {
          return image.url;
        }
        // Otherwise, prepend /
        return `/${image.url}`;
      }
      // If no url, construct from filename
      // Payload serves uploads from /api/uploads/file/
      if (image.filename) {
        return `/api/uploads/file/${image.filename}`;
      }
    }
    return '/images/partners/default.jpg';
  };

  return (
    <section className="relative w-full overflow-hidden bg-white pb-20 pt-12 md:pb-28 md:pt-20">
      {/* Grid SVG background (same as Advisors) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage: 'url(/images/advisors-grid-bg.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      {/* Decorative: top-right blurred orange circle */}
      <div
        className="pointer-events-none absolute -right-[20%] top-[-10%] z-[1] h-[500px] w-[500px] md:-right-[10%] md:top-[-15%]"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full opacity-[0.1]"
          style={{
            background: 'radial-gradient(circle, #FFA377 0%, #FF671F 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Diagonal gradient overlay */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-[1] h-[800px] w-full max-w-[644px]"
        style={{
          background:
            'linear-gradient(240.635deg, rgba(255, 255, 255, 0) 43.35%, rgb(255, 255, 255) 83.086%)',
        }}
        aria-hidden
      />

      {/* Decorative: bottom-left blurred orange circle */}
      <div
        className="pointer-events-none absolute -left-12 bottom-0 z-[1] h-[360px] w-[360px] opacity-20 md:h-[467px] md:w-[467px]"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, #FFA377 0%, #FF671F 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Content — same typography and layout as Advisors */}
      <div className="tq-container relative z-10">
        <div className="flex flex-col items-center gap-[30px]">
          <h1 className="w-full text-center font-bold leading-[48px] text-[#434343] text-[40px] md:text-[50px]">
            Partners
          </h1>
          <p className="w-full text-center font-normal leading-[30px] text-[#333] text-[16px] md:text-[18px]">
            Institutional and knowledge partners contributing to India&apos;s future discourse.
          </p>
        </div>

        {partners.length === 0 ? (
          <p className="mt-12 text-center text-[#666]">No partners available at the moment.</p>
        ) : (
          <div className="mt-12 space-y-6 md:mt-16">
            {partners.map((partner) => {
              const imageUrl = getImageUrl(partner.image);
              return (
                <article
                  key={`partner-${partner.id}`}
                  className="relative flex flex-col gap-6 border border-[#dad8d6] bg-white p-6 md:flex-row"
                >
                  <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-[#f5f5f5] md:h-[200px] md:w-[200px]">
                    <Image
                      src={imageUrl}
                      alt={partner.name}
                      fill
                      sizes="(min-width: 768px) 200px, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="m-0 text-[20px] font-semibold text-black md:text-[22px]">
                        {partner.name}
                      </h3>
                      {partner.website && (
                        <Link
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${partner.name} website`}
                          className="shrink-0 text-[#0A66C2]"
                        >
                          <WebsiteIcon />
                        </Link>
                      )}
                    </div>
                    {partner.fullName && (
                      <p className="mb-4 mt-1 text-[13px] leading-[1.8] text-[#999] md:text-[14px]">
                        {partner.fullName}
                      </p>
                    )}
                    {partner.bio && (
                      <p className="text-[16px] leading-[1.8] text-black">{partner.bio}</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
