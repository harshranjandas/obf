'use client';

import Image from 'next/image';
import Link from 'next/link';
import LinkedinIcon from '@/components/icons/LinkedinIcon';

export interface MemberCardData {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
  linkedIn?: string | null;
}

interface MemberCardProps {
  member: MemberCardData;
}

/** Same T9L-style card effect: image zoom on hover, gradient overlay, white panel → white text overlay. */
export default function MemberCard({ member }: MemberCardProps) {
  const { name, role, imageUrl, linkedIn } = member;

  return (
    <article
      className="group relative flex w-full max-w-[368px] flex-col overflow-hidden border border-[#dad8d6] text-left outline-none transition-shadow duration-300 hover:shadow-lg"
      aria-label={`${name}, ${role}`}
    >
      <div className="relative flex-1 overflow-hidden">
        <div className="relative aspect-[3/4] min-h-[268px] w-full overflow-hidden sm:min-h-[362px]">
          {imageUrl ? (
            <div className="absolute inset-0 origin-center scale-100 transform-gpu transition-transform duration-1000 ease-out will-change-transform group-hover:scale-110">
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="(min-width: 1280px) 320px, 33vw"
                className="object-cover object-top"
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#f5f5f5] text-[48px] font-semibold text-[#999]">
              {name.charAt(0)}
            </div>
          )}
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black to-black/0"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 min-h-[35%] overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            aria-hidden
          />

          <div className="absolute inset-x-0 bottom-0 bg-white px-6 py-5 opacity-100 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
            <div className="flex justify-between gap-2 text-left">
              <div className="min-w-0 flex-1">
                <h3 className="m-0 text-[16px] font-normal text-black">{name}</h3>
                <p className="m-0 truncate text-[13px] font-normal text-[#999]">{role}</p>
              </div>
              {linkedIn && (
                <div className="pointer-events-auto shrink-0 pt-0.5">
                  <Link
                    href={linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} on LinkedIn`}
                    className="text-[#0A66C2]"
                  >
                    <LinkedinIcon />
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-30 px-6 pb-5 pt-3 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
            <div className="flex justify-between gap-2 text-left">
              <div className="min-w-0 flex-1">
                <h3 className="m-0 text-[16px] font-normal text-white">{name}</h3>
                <p className="m-0 text-[13px] font-normal text-white/80">{role}</p>
              </div>
              {linkedIn && (
                <div className="pointer-events-auto shrink-0 pt-0.5">
                  <Link
                    href={linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} on LinkedIn`}
                    className="text-white transition-colors duration-300 hover:text-white/90"
                  >
                    <LinkedinIcon />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
