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
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
  },
};

const advisors = [
  {
    id: 1,
    name: 'Subho Ray',
    role: 'President of Internet and Mobile Association of India (IAMAI)',
    image: '/images/advisors/Subho-Ray.webp',
    linkedIn: 'https://www.linkedin.com/in/subho/',
  },
  {
    id: 2,
    name: 'Gaurav Chopra',
    role: 'Senior Vice President at Internet And Mobile Association of India (IAMAI)',
    image: '/images/advisors/Gaurav-Chopra.webp',
    linkedIn: 'https://www.linkedin.com/in/gauravco/',
  },
  {
    id: 3,
    name: 'Manoj K Jha',
    role: 'Founder & Director of GS SCORE Institute, Managing Director of Vitti AI',
    image: '/images/advisors/Manoj-K-Jha.webp',
    linkedIn: 'https://www.linkedin.com/in/manoj-k-jha-8789249/',
  },
  // {
  //   id: 4,
  //   name: 'Rameesh Kailasam',
  //   role: 'CEO of IndiaTech.org, Former MD of APCO Worldwide',
  //   image: '/images/advisors/Rameesh-Kailasam.webp',
  //   linkedIn: 'https://www.linkedin.com/in/rameesh/',
  // },
  // {
  //   id: 5,
  //   name: 'Nikunj Dalmia',
  //   role: 'Founder of Investique Media, Former Managing Editor of ET NOW',
  //   image: '/images/advisors/Nikunj-Dalmia.webp',
  //   linkedIn: 'https://www.linkedin.com/in/nikunj-dalmia-97329a9/ ',
  // },
  {
    id: 6,
    name: 'Nikhil Katariya',
    role: 'CEO of Bharat Credit Opportunities Fund',
    image: '/images/advisors/Nikhil-Katariya.webp',
    linkedIn: 'https://www.linkedin.com/in/nikhil-katariya-aa21746/',
  },
];

export default async function AdvisorsPage() {
  return (
    <section className="bg-white px-[16px] py-[50px] md:px-6 md:py-[100px]">
      <div className="tq-container w-full">
        <h1 className="text-[38px] font-extrabold leading-[1.2] mb-[70px] text-center tracking-tight md:text-[50px]">
          Advisors
        </h1>
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
