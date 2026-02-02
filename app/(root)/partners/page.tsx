import WebsiteIcon from '@/components/icons/WebsiteIcon';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';

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
    <section className="bg-white px-[16px] py-[50px] md:px-6 md:py-[100px]">
      <div className="tq-container">
        <h1 className="text-[38px] font-extrabold leading-[1.2] mb-[70px] text-center tracking-tight md:text-[50px]">
          Partners
        </h1>
      </div>
      <div className="tq-container w-full">
        {partners.length === 0 ? (
          <p className="text-center text-gray-500">No partners available at the moment.</p>
        ) : (
          <div className="space-y-6">
            {partners.map((partner) => {
              const imageUrl = getImageUrl(partner.image);
              return (
                <div
                  key={`partner-${partner.id}`}
                  className="relative flex flex-col gap-6 border border-[#EDEDED] p-6 md:flex-row"
                >
                  <div className="relative h-auto w-full md:h-[200px] md:w-[200px] flex-shrink-0">
                    <Image
                      src={imageUrl}
                      alt={partner.name}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="m-0 text-[20px] font-semibold text-black md:text-[22px] flex items-center gap-2 justify-between">
                      {partner.name}
                      {partner.website && (
                        <Link
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${partner.name} on website`}
                          className="md:hidden"
                        >
                          <WebsiteIcon />
                        </Link>
                      )}
                    </h3>
                    {partner.fullName && (
                      <p className="mb-5 text-[13px] leading-[1.8] text-[#999999] md:text-[14px]">
                        {partner.fullName}
                      </p>
                    )}
                    <div className="right-6 top-6 mb-[24px] flex gap-2 md:absolute md:mb-0 hidden md:flex">
                      {partner.website && (
                        <Link
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${partner.name} on website`}
                        >
                          <WebsiteIcon />
                        </Link>
                      )}
                    </div>
                    {partner.bio && (
                      <p className="font-[16px] leading-[1.8] text-black">
                        {partner.bio}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
