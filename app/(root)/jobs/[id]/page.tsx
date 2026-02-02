import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import JobSubmissionForm from '@/components/JobSubmissionForm';
import RichText from '@/components/RichText';

export const dynamic = 'force-dynamic';

interface LexicalContent {
  root: {
    children: unknown[];
  };
}

interface Job {
  id: number;
  title: string;
  location: string;
  locationType: string;
  locationTypeOther?: string;
  notificationEmails: string;
  theRole: LexicalContent | string;
  whatYouDo: LexicalContent | string;
  whatWereLookingFor: LexicalContent | string;
  preferredExperience?: LexicalContent | string;
  lifeAtOBF?: LexicalContent | string;
  howToApply?: LexicalContent | string;
  extraSection1Title?: string;
  extraSection1Description?: LexicalContent | string;
  extraSection2Title?: string;
  extraSection2Description?: LexicalContent | string;
  extraSection3Title?: string;
  extraSection3Description?: LexicalContent | string;
  extraSection4Title?: string;
  extraSection4Description?: LexicalContent | string;
  status: string;
  displayOrder: number;
}

async function getJob(id: string): Promise<Job | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002';
    const response = await fetch(`${baseUrl}/api/public/jobs/${id}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

// Helper to get plain text from rich text for metadata
function getPlainText(content: LexicalContent | string | undefined): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  
  const extractText = (nodes: unknown[]): string => {
    let text = '';
    for (const node of nodes) {
      const n = node as { type?: string; text?: string; children?: unknown[] };
      if (n.type === 'text' && n.text) {
        text += n.text + ' ';
      }
      if (n.children && Array.isArray(n.children)) {
        text += extractText(n.children);
      }
    }
    return text;
  };

  if (content.root && content.root.children) {
    return extractText(content.root.children).trim();
  }
  return '';
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

interface PageParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    return {
      title: 'Job Not Found - One Big Future',
    };
  }

  const description = getPlainText(job.theRole).substring(0, 160);

  return {
    title: `${job.title} - One Big Future`,
    description,
    openGraph: {
      title: `${job.title} - One Big Future`,
      description,
      images: ['/images/job-logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} - One Big Future`,
      description,
      images: ['/images/job-logo.png'],
    },
  };
}

export default async function JobDetailPage({ params }: PageParams) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) return notFound();

  // Create a simplified job object for the form
  const jobForForm = {
    id: String(job.id),
    title: job.title,
    location: job.location,
    locationType: getLocationTypeDisplay(job),
    notificationEmails: job.notificationEmails,
  };

  return (
    <section className="bg-white shadow-[0px_0px_30px_0px_#00000014]">
      <div className="px-[20px] pb-[50px] pt-[40px] md:px-[110px] md:pb-[100px] md:pt-[84px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-0">
          <div className="w-full space-y-8 lg:w-[58%] lg:pr-[100px]">
            <div className="flex items-center gap-6">
              <div className="space-y-6">
                <h1 className="m-0 pt-6 text-[32px] font-bold leading-[38px] text-black md:text-[40px] md:leading-[46px]">
                  {job.title}
                </h1>
                <p className="text-[14px] text-gray-600">
                  {getLocationTypeDisplay(job)} · {job.location}
                </p>
              </div>
            </div>
            <section className="space-y-[70px]">
              {/* The Role */}
              {job.theRole && (
                <div className="space-y-4">
                  <h2 className="text-[20px] font-bold text-black">The Role</h2>
                  <RichText content={job.theRole} />
                </div>
              )}

              {/* What You'll Do */}
              {job.whatYouDo && (
                <div className="space-y-4">
                  <h2 className="text-[20px] font-bold text-black">
                    What You'll Do
                  </h2>
                  <RichText content={job.whatYouDo} />
                </div>
              )}

              {/* What We're Looking For */}
              {job.whatWereLookingFor && (
                <div className="space-y-4">
                  <h2 className="text-[20px] font-bold text-black">
                    What We're Looking For
                  </h2>
                  <RichText content={job.whatWereLookingFor} />
                </div>
              )}

              {/* Preferred Experience */}
              {job.preferredExperience && (
                <div className="space-y-4">
                  <h2 className="text-[20px] font-bold text-black">
                    Preferred Experience
                  </h2>
                  <RichText content={job.preferredExperience} />
                </div>
              )}

              {/* Life at OBF */}
              {job.lifeAtOBF && (
                <div className="space-y-4">
                  <h2 className="text-[20px] font-bold text-black">
                    Life at OBF
                  </h2>
                  <RichText content={job.lifeAtOBF} />
                </div>
              )}

              {/* How to Apply */}
              {job.howToApply && (
                <div className="space-y-4">
                  <h2 className="text-[20px] font-bold text-black">
                    How to Apply
                  </h2>
                  <RichText content={job.howToApply} />
                </div>
              )}

              {/* Extra Section 1 */}
              {job.extraSection1Title && job.extraSection1Description && (
                <div className="space-y-4">
                  <h2 className="text-[20px] font-bold text-black">
                    {job.extraSection1Title}
                  </h2>
                  <RichText content={job.extraSection1Description} />
                </div>
              )}

              {/* Extra Section 2 */}
              {job.extraSection2Title && job.extraSection2Description && (
                <div className="space-y-4">
                  <h2 className="text-[20px] font-bold text-black">
                    {job.extraSection2Title}
                  </h2>
                  <RichText content={job.extraSection2Description} />
                </div>
              )}

              {/* Extra Section 3 */}
              {job.extraSection3Title && job.extraSection3Description && (
                <div className="space-y-4">
                  <h2 className="text-[20px] font-bold text-black">
                    {job.extraSection3Title}
                  </h2>
                  <RichText content={job.extraSection3Description} />
                </div>
              )}

              {/* Extra Section 4 */}
              {job.extraSection4Title && job.extraSection4Description && (
                <div className="space-y-4">
                  <h2 className="text-[20px] font-bold text-black">
                    {job.extraSection4Title}
                  </h2>
                  <RichText content={job.extraSection4Description} />
                </div>
              )}
            </section>
          </div>

          <div className="w-full lg:w-[42%]">
            <div className="sticky top-[140px] mt-8 space-y-6">
              <JobSubmissionForm job={jobForForm} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
