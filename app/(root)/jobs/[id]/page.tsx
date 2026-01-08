import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { jobs } from '@/lib/jobs';
import JobSubmissionForm from '@/components/JobSubmissionForm';

interface Params {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return notFound();
  }

  return {
    title: `${job.title} - One Big Future`,
    description: job.theRole,
    openGraph: {
      title: `${job.title} - One Big Future`,
      description: job.theRole,
      images: [job.logo],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} - One Big Future`,
      description: job.theRole,
      images: [job.logo],
    },
  };
}

export default async function JobDetailPage({ params }: Params) {
  const { id } = await params;
  const job = jobs.find((job) => job.id === id);

  if (!job) return notFound();

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
              </div>
            </div>
            <section className="space-y-[70px]">
              <div className="space-y-4">
                <h2 className="text-[20px] font-bold text-black">The Role</h2>
                <p className="text-base font-light leading-relaxed text-black [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:font-mono [&_em]:italic [&_s]:line-through [&_strong]:font-bold [&_u]:underline">
                  {job.theRole}
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-[20px] font-bold text-black">
                  What You’ll Do
                </h2>

                <ul className="list-outside list-disc space-y-3 pl-5 text-base font-light leading-relaxed text-black [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:font-mono [&_em]:italic [&_s]:line-through [&_strong]:font-bold [&_u]:underline">
                  {job.whatYouDo.map((item: string, index: number) => (
                    <li
                      key={`${item}-${index}`}
                      className="text-base font-light leading-relaxed text-black [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:font-mono [&_em]:italic [&_s]:line-through [&_strong]:font-bold [&_u]:underline"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-[20px] font-bold text-black">
                  What We’re Looking For
                </h2>

                <ul className="list-outside list-disc space-y-3 pl-5 text-base font-light leading-relaxed text-black [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:font-mono [&_em]:italic [&_s]:line-through [&_strong]:font-bold [&_u]:underline">
                  {job.whatWereLookingFor.map((item: string, index: number) => (
                    <li
                      key={`${item}-${index}`}
                      className="text-base font-light leading-relaxed text-black [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:font-mono [&_em]:italic [&_s]:line-through [&_strong]:font-bold [&_u]:underline"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-[20px] font-bold text-black">
                  Preferred Experience
                </h2>

                <ul className="list-outside list-disc space-y-3 pl-5 text-base font-light leading-relaxed text-black [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:font-mono [&_em]:italic [&_s]:line-through [&_strong]:font-bold [&_u]:underline">
                  {job.preferredExperience.map(
                    (item: string, index: number) => (
                      <li
                        key={`${item}-${index}`}
                        className="text-base font-light leading-relaxed text-black [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:font-mono [&_em]:italic [&_s]:line-through [&_strong]:font-bold [&_u]:underline"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-[20px] font-bold text-black">
                  How to Apply
                </h2>
                <p className="text-base font-light leading-relaxed text-black [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:font-mono [&_em]:italic [&_s]:line-through [&_strong]:font-bold [&_u]:underline">
                  Share your CV and 3–4 long-form writing samples (links
                  preferred).
                </p>
              </div>
            </section>
          </div>

          <div className="w-full lg:w-[42%]">
            <div className="sticky top-[140px] mt-8 space-y-6">
              <JobSubmissionForm job={job} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
