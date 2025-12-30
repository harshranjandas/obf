import { Metadata } from 'next';
import JobListingCard from '@/components/JobListingCard';
import { jobs } from '@/lib/jobs';

export const metadata: Metadata = {
  title: 'Jobs - One Big Future',
  description: 'Jobs - One Big Future',
  openGraph: {
    title: 'Jobs - One Big Future',
    description: 'Jobs - One Big Future',
    images: ['/og-image.jpg'],
    type: 'website',
    siteName: 'One Big Future',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs - One Big Future',
    description: 'Jobs - One Big Future',
    images: ['/og-image.jpg'],
  },
};

export default async function JobsPage() {
  return (
    <section className="bg-white py-[50px] md:py-[100px]">
      <div className="tq-container">
        <h1 className="text-[38px] font-extrabold leading-[1.2] mb-[70px] text-center tracking-tight md:text-[50px]">
          Jobs
        </h1>
        <JobListingCard jobs={jobs} />
      </div>
    </section>
  );
}
