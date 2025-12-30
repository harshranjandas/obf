import Button from './ui/Button';
import Image from 'next/image';
import { Job } from '@/types/type';
import Link from 'next/link';

export default function JobListingCard({ jobs }: { jobs: Job[] }) {
  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="relative flex min-h-[95px] w-full flex-col border border-[#EDEDED] bg-white p-6 transition-all duration-300 ease-out hover:bg-[#FFFBF0] md:flex-row md:items-center md:p-0"
        >
          <div className="relative h-[60px] w-[60px] md:absolute md:left-0 md:top-0 md:h-[95px] md:w-[95px] md:p-0">
            <Image
              src={job.logo || ''}
              alt={job.title || ''}
              width={95}
              height={95}
              className="object-cover"
            />
          </div>
          <div className="flex w-full flex-col pl-0 md:flex-row md:items-center md:pl-[95px]">
            <div className="flex w-full flex-col md:flex-row md:items-center">
              <div className="flex min-w-0 flex-col items-start p-0 pt-6 text-left md:w-[40%] md:p-6">
                <h6
                  className="m-0 w-full whitespace-break-spaces text-[16px] font-normal text-black md:text-[18px] md:leading-[24px]"
                  title={job.title}
                  dangerouslySetInnerHTML={{ __html: job.title }}
                ></h6>
              </div>
              <div className="flex flex-col items-start border-0 border-[#EDEDED] pl-0 pr-0 pt-6 text-left md:w-[35%] md:border-l md:pl-[80px] md:pr-[30px] md:pt-0">
                <p className="text-[13px] leading-[1.8] text-black md:text-[16px]">
                  {job.locationType}
                  {job.location && ` · ${job.location}`}
                </p>
              </div>
              <div className="flex w-full border-0 border-[#EDEDED] pl-0 pr-0 pt-6 md:w-[25%] md:items-center md:justify-end md:border-l md:pr-[30px] md:pt-0">
                <Link href={`/jobs/${job.id}`}>
                  <Button variant="secondary" className="w-full md:w-auto">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
