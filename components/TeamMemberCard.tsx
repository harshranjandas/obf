import Image from 'next/image';
import Link from 'next/link';
import LinkedinIcon from './icons/LinkedinIcon';

export default function TeamMemberCard({
  member,
}: {
  member: {
    id: number;
    name: string;
    role: string;
    image: string;
    linkedIn: string;
  };
}) {
  return (
    <>
      <div className="group relative flex flex-col overflow-hidden border border-gray-200 text-center outline-none transition-shadow duration-300 hover:shadow-lg cursor-pointer">
        <div className="relative flex-1 overflow-hidden">
          <div className="relative aspect-[3/4] min-h-[268px] w-full overflow-hidden sm:min-h-[362px]">
            <div className="absolute inset-0 origin-center scale-100 transform-gpu transition-transform duration-1000 ease-out will-change-transform group-hover:scale-110">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(min-width: 1280px) 320px, 33vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-linear-to-t from-black to-black/0"></div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[35%] overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>

            <div
              className="absolute inset-x-0 bottom-0 bg-white opacity-100 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
              style={{ padding: '20px 24px' }}
            >
              <div className="flex justify-between gap-2 text-left">
                <div className="min-w-0 flex-1">
                  <h3 className="m-0 text-[16px] font-normal text-black">
                    {member.name}
                  </h3>
                  {member.role && (
                    <p className="m-0 truncate text-[13px] font-normal text-[#999999]">
                      {member.role}
                    </p>
                  )}
                </div>

                {member.linkedIn && (
                  <div className="pointer-events-auto pt-2">
                    <Link
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="text-[#0A66C2]"
                    >
                      <LinkedinIcon />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-[24px] pb-[20px] pt-[12px] opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
              <div className="flex justify-between gap-2 text-left">
                <div className="min-w-0 flex-1">
                  <h3 className="m-0 text-[16px] font-normal text-white">
                    {member.name}
                  </h3>
                  {member.role && (
                    <p className="m-0 text-[13px] font-normal text-white/80">
                      {member.role}
                    </p>
                  )}
                </div>

                {member.linkedIn && (
                  <div className="pointer-events-auto pt-2">
                    <Link
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="text-white transition-colors duration-300"
                    >
                      <LinkedinIcon />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
