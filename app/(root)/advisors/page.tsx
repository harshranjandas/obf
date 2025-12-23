import TeamMemberCard from '@/components/TeamMemberCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advisors - One Big Future',
  description: 'Advisors - One Big Future',
  openGraph: {
    title: 'Advisors - One Big Future',
    description: 'Advisors - One Big Future',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'One Big Future Advisors',
      },
    ],
    type: 'website',
    siteName: 'One Big Future',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advisors - One Big Future',
    description: 'Advisors - One Big Future',
    images: ['/images/og-image.png'],
  },
};

const advisors = [
  {
    id: 1,
    name: 'Subho Ray',
    role: 'President of Internet and Mobile Association of India (IAMAI)',
    image: '/images/advisors/Subho-Ray.webp',
    linkedIn: 'https://www.linkedin.com/in/subhoray/',
  },
  {
    id: 2,
    name: 'Gaurav Chopra',
    role: 'Senior Vice President at Internet And Mobile Association of India (IAMAI)',
    image: '/images/advisors/Gaurav-Chopra.webp',
    linkedIn: 'https://www.linkedin.com/in/gauravchopra/',
  },
  {
    id: 3,
    name: 'Manoj K Jha',
    role: 'Founder & Director of GS SCORE Institute, Managing Director of Vitti AI',
    image: '/images/advisors/Manoj-K-Jha.webp',
    linkedIn: 'https://www.linkedin.com/in/manojkjha/',
  },
  {
    id: 4,
    name: 'Rameesh Kailasam',
    role: 'CEO of IndiaTech.org, Former MD of APCO Worldwide',
    image: '/images/advisors/Rameesh-Kailasam.webp',
    linkedIn: 'https://www.linkedin.com/in/rameeshkailasam/',
  },
  {
    id: 5,
    name: 'Nikunj Dalmia',
    role: 'Founder of Investique Media, Former Managing Editor of ET NOW',
    image: '/images/advisors/Nikunj-Dalmia.webp',
    linkedIn: 'https://www.linkedin.com/in/nikunjdalmia/',
  },
  {
    id: 6,
    name: 'Nikhil Katariya',
    role: 'CEO of Bharat Credit Opportunities Fund',
    image: '/images/advisors/Nikhil-Katariya.webp',
    linkedIn: 'https://www.linkedin.com/in/nikhilkatariya/',
  },
];

export default async function AdvisorsPage() {
  return (
    <section className="bg-white px-[16px] py-[50px] md:px-6 md:py-[100px]">
      <div className="tq-container w-full pb-[35px]">
        <div className="relative mx-auto flex flex-col items-center gap-0 text-left md:w-[470px] md:text-center">
          <h1 className="relative w-full text-[38px] font-extrabold leading-[1.2] tracking-tight sm:max-w-[533px] md:text-center md:text-[50px]">
            Advisors
          </h1>
        </div>
      </div>
      <div className="tq-container w-full">
        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {advisors.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
