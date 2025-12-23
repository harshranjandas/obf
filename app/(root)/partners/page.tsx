import WebsiteIcon from '@/components/icons/WebsiteIcon';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';

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

const partners = [
  {
    id: 1,
    name: 'IAMAI',
    role: 'Internet and Mobile Association of India',
    bio: 'The Internet and Mobile Association of India (IAMAI) is a leading industry body representing India’s digital economy, including online platforms, mobile services, and digital value-added sectors. IAMAI works closely with policymakers, industry leaders, and stakeholders to advocate for progressive policy, fair competition, and responsible digital growth, while fostering innovation and collaboration across areas such as digital payments, e-commerce, advertising, gaming, and emerging technologies.',
    image: '/images/partners/iamai.jpg',
    website: 'https://www.iamai.in/',
  },
  {
    id: 2,
    name: 'T9L',
    role: 'India’s First Full-Stack Venture Studio',
    bio: 'T9L is India’s first full-stack venture studio, co-founded by Fahad Moti Khan, Gaurav Gaggar, and Nitin Raj. It builds and scales IP-led businesses across sectors, partnering with founders to create globally competitive companies through a structured value-creation framework. To date, T9L has worked with over 80 startups, with a cumulative portfolio valuation exceeding $2 billion and a strong track record of successful venture outcomes.',
    image: '/images/partners/t9l.jpg',
    website: 'https://www.t9l.com/',
  },
];

export default async function PartnersPage() {
  return (
    <section className="bg-white px-[16px] py-[50px] md:px-6 md:py-[100px]">
      <div className="tq-container">
        <h1 className="text-[38px] font-extrabold leading-[1.2] mb-[70px] text-center tracking-tight md:text-[50px]">
          Partners
        </h1>
      </div>
      <div className="tq-container w-full">
        <div className="space-y-6">
          {partners.map((partner) => {
            return (
              <div
                key={`partner-${partner.id}`}
                className="relative flex flex-col gap-6 border border-[#EDEDED] p-6 md:flex-row"
              >
                <div className="relative h-auto w-full md:h-[200px] md:w-[200px]">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="m-0 text-[20px] font-semibold text-black md:text-[22px]">
                    {partner.name}
                  </h3>
                  {partner.role && (
                    <p className="mb-5 text-[13px] leading-[1.8] text-[#999999] md:text-[14px]">
                      {partner.role}
                    </p>
                  )}
                  <div className="right-6 top-6 mb-[24px] flex gap-2 md:absolute md:mb-0">
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
      </div>
    </section>
  );
}
