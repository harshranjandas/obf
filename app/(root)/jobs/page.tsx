import { Metadata } from 'next';
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
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002';
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
    <section className="bg-white py-[50px] md:py-[100px]">
      <div className="tq-container">
        <h1 className="text-[38px] font-extrabold leading-[1.2] mb-[70px] text-center tracking-tight md:text-[50px]">
          Jobs
        </h1>
        
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available at the moment.</p>
        ) : (
          <>
            <JobListingCard jobs={jobs} />
            
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
