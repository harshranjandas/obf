import type { Metadata } from 'next';
import JobListingCard from '@/components/JobListingCard';
import Pagination from '@/components/Pagination';

export const dynamic = 'force-dynamic';

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

interface Job {
  id: number;
  title: string;
  location: string;
  locationType: string;
  locationTypeOther?: string;
  status: string;
  displayOrder: number;
}

interface JobsResponse {
  docs: Job[];
  totalDocs: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

async function getJobs(page: number = 1): Promise<JobsResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3002');
    const response = await fetch(`${baseUrl}/api/public/jobs?page=${page}&limit=10`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      console.error('Failed to fetch jobs:', response.statusText);
      return {
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null,
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return {
      docs: [],
      totalDocs: 0,
      totalPages: 0,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: null,
      prevPage: null,
    };
  }
}

// Helper to get display location type
function getLocationTypeDisplay(job: Job): string {
  if (job.locationType === 'other' && job.locationTypeOther) {
    return job.locationTypeOther;
  }
  const typeLabels: Record<string, string> = {
    onsite: 'On-site',
    remote: 'Remote',
    hybrid: 'Hybrid',
  };
  return typeLabels[job.locationType] || job.locationType;
}

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function JobsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const jobsData = await getJobs(currentPage);

  // Transform jobs for the JobListingCard component
  const jobs = jobsData.docs.map((job) => ({
    id: String(job.id),
    title: job.title,
    location: job.location,
    locationType: getLocationTypeDisplay(job),
    logo: '/images/job-logo.png', // Default logo
  }));

  return (
    <section className="relative w-full overflow-hidden bg-white pb-20 pt-12 md:pb-28 md:pt-20">
      {/* Grid SVG background */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
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
      <div className="tq-container relative z-10">
        <div className="flex flex-col items-center gap-[30px]">
          <h1 className="w-full text-center font-bold leading-[48px] text-[#434343] text-[40px] md:text-[50px]">
            Jobs
          </h1>
          <p className="w-full text-center font-normal leading-[30px] text-[#333] text-[16px] md:text-[18px]">
            Join us in shaping India&apos;s future.
          </p>
        </div>
        {jobs.length === 0 ? (
          <p className="mt-12 text-center text-[#666] md:mt-16">No jobs available at the moment.</p>
        ) : (
          <>
            <div className="mt-12 md:mt-16">
              <JobListingCard jobs={jobs} />
            </div>
            <Pagination
              currentPage={jobsData.page}
              totalPages={jobsData.totalPages}
              basePath="/jobs"
              hasNextPage={jobsData.hasNextPage}
              hasPrevPage={jobsData.hasPrevPage}
            />
          </>
        )}
      </div>
    </section>
  );
}
