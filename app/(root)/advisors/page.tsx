import config from '@payload-config';
import { getPayload } from 'payload';
import type { Metadata } from 'next';
import AdvisorCardGrid from './AdvisorCardGrid';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Advisors - One Big Future',
  description:
    'A full-stack team for full-stack challenges, from product and strategy to fundraising and operations.',
};

interface AdvisorImage {
  id?: string;
  url?: string;
  filename?: string;
}

interface Advisor {
  id: string;
  name: string;
  role: string;
  image: AdvisorImage | string | null;
  linkedIn?: string | null;
}

async function getAdvisors(): Promise<Advisor[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'advisors',
      where: { status: { equals: 'active' } },
      sort: 'displayOrder',
      limit: 100,
      depth: 1,
    });
    return (result.docs ?? []) as unknown as Advisor[];
  } catch (error) {
    console.error('Error fetching advisors:', error);
    return [];
  }
}

function getImageUrl(image: Advisor['image']): string | null {
  if (!image) return null;
  if (typeof image === 'string') {
    return image.startsWith('/') ? image : `/${image}`;
  }
  if (image.url) {
    const url = image.url;
    return url.startsWith('http') ? url : url.startsWith('/') ? url : `/${url}`;
  }
  if (image.filename) {
    return `/api/uploads/file/${image.filename}`;
  }
  return null;
}

export default async function AdvisorsPage() {
  const advisors = await getAdvisors();

  return (
    <section className="relative w-full overflow-hidden bg-white pb-20 pt-12 md:pb-28 md:pt-20">
        {/* Grid SVG background (full section, behind everything) */}
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

        {/* Decorative: top-right blurred orange circle (matches reference opacity) */}
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

        {/* Content — title + subtitle match reference Frame15 */}
        <div className="tq-container relative z-10">
          <div className="flex flex-col items-center gap-[30px]">
            <h1 className="w-full text-center font-bold leading-[48px] text-[#434343] text-[40px] md:text-[50px]">
              Advisors
            </h1>
            <p className="w-full text-center font-normal leading-[30px] text-[#333] text-[16px] md:text-[18px]">
              A full-stack team for full-stack challenges, from product and strategy to fundraising
              and operations.
            </p>
          </div>

          {advisors.length === 0 ? (
            <p className="mt-12 text-center text-[#666]">No advisors to display yet.</p>
          ) : (
            <AdvisorCardGrid
              advisors={advisors.map((advisor) => ({
                id: advisor.id,
                name: advisor.name,
                role: advisor.role,
                imageUrl: getImageUrl(advisor.image),
                linkedIn: advisor.linkedIn ?? null,
              }))}
            />
          )}
        </div>
      </section>
  );
}
