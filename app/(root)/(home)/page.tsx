'use client';

import Image from 'next/image';
import WhatIsOFBSection from '@/components/WhatIsOFBSection';
import Button from '@/components/ui/Button';
import MusicPlayer from '@/components/MusicPlayer';
import Link from 'next/link';

const tags = [
  {
    label: 'Podcasts',
    value: 'podcasts',
  },
  {
    label: 'Interviews',
    value: 'interviews',
  },
  {
    label: 'Events',
    value: 'events',
  },
];

export default function Home() {
  return (
    <>
      <section className="bg-white shadow-brand p-4 md:p-6 w-full">
        <div
          className="bg-[#FFF1E7] min-h-[500px] relative flex items-center md:p-6 p-0 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 74%), url('/images/bg-pattern.png')`,
          }}
        >
          <div className="animated-radial-gradient -right-[80px] top-1/2 -translate-y-1/2" />
          <div className="tq-container relative z-10 w-full">
            <div className="flex w-full md:w-auto flex-col md:flex-row items-center">
              <div className="mb-[40px] md:mb-0 text-center md:text-left pt-[50px] md:pt-0">
                <div className="moving-gradient-border inline-block">
                  <span className="text-[#888888] text-[12px] md:text-base font-semibold px-4 py-2 uppercase tracking-widest block">
                    ONE BIG FUTURE
                  </span>
                </div>
                <h1 className="text-[40px] md:text-[60px] font-medium text-[#888888] leading-[50px] md:leading-[70px] pt-[28px] pb-[40px]">
                  India’s <span className="text-brand font-bold">future</span>{' '}
                  as imagined by our{' '}
                  <span className="text-brand font-bold">leaders</span>
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.value}
                      className="moving-gradient-border-gray inline-block"
                    >
                      <span className="md:px-4 px-2 md:py-2 py-1 text-[10px] text-[#3d3d3d] font-semibold uppercase tracking-widest block">
                        {tag.label}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute md:top-1/2 md:-translate-y-1/2 md:right-[14%] w-[220px] h-[80px] bottom-[90px] md:bottom-auto left-0 md:left-auto right-0 mx-auto">
                  <MusicPlayer />
                </div>
                <Image
                  src="/images/banner-cover.webp"
                  alt="Banner Cover"
                  width={1557}
                  height={1447}
                  className="w-full h-full object-contain "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative">
        <section className="md:sticky md:top-0 md:h-[calc(100vh-100px)] mb-6 bg-white shadow-brand flex items-center z-20">
          <div className="tq-container w-full">
            <div className="flex flex-col md:flex-row gap-8 py-[50px] md:py-0">
              <div className="w-full md:w-[40%]">
                <span className="text-[#888888] text-[14px] mb-2 inline-block font-extrabold uppercase tracking-widest">
                  introduction
                </span>
                <h2 className="m-0 text-[40px] md:text-[48px] font-extrabold leading-[46px] md:leading-[54px] text-[#434343]">
                  India In The <br className="hidden md:block" />
                  21st Century
                </h2>
              </div>
              <div className="w-full md:w-[60%]">
                <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[36px] text-black">
                  The 21st century is poised to be defined by India&apos;s
                  ascent— a century where the nation doesn&apos;t just rise but
                  soars.
                </p>
                <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[36px] mt-4 text-black">
                  India stands at the cusp of a transformative era, emerging as
                  a beacon of innovation, collaboration and growth on the global
                  stage.
                </p>
                <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[36px] mt-4 text-black">
                  A young, forward-looking workforce, fueled by a culture of
                  ingenuity and collaboration, is powering a wave of progress
                  that resonates far beyond its borders.
                </p>
                <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[36px] mt-4 text-black">
                  One Big Future (OBF) is built to capture this momentum.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Image Section - Stacks on top */}
        <section className="sticky top-0 z-30">
          <Image
            src="/images/podcast.webp"
            alt="India In The 21st Century"
            width={2880}
            height={1300}
            className="w-full h-auto"
          />
        </section>
      </div>
      <WhatIsOFBSection />
      <section
        className="bg-white py-[50px] md:py-[100px] shadow-brand"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(13, 13, 13, 3%) 50%), url('/images/bg-pattern.png')`,
        }}
      >
        <div className="tq-container">
          <div className="text-center">
            <span className="text-[#888888] text-[14px] mb-2 font-extrabold uppercase tracking-widest">
              Explore One Big future
            </span>
            <h2 className="text-[32px] font-bold leading-[40px] text-[#434343] md:text-[48px] md:leading-[48px] mb-[56px] mt-2">
              Coming Soon
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-12">
            <div
              className="px-4 py-10 md:p-10 w-full md:w-1/3 relative"
              style={{
                backgroundColor: '#FFF1E7',
                backgroundImage: `url('/images/interview-gradient.png')`,
                backgroundPosition: 'right center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Image
                src="/images/interviews.webp"
                alt="Interviews"
                width={489}
                height={417}
                className="absolute -top-6 right-[16px] w-auto max-h-[150px] md:max-h-[170px]"
              />
              <h3 className="text-[20px] text-[#EF671F] font-semibold leading-[22px]">
                Interviews
              </h3>
              <p className="text-[#EF671F] text-[14px] font-medium leading-[20px] mt-2">
                Vision interviews of <br />
                luminaries from <br />
                varied fields
              </p>
            </div>
            <div
              className="px-4 py-10 md:p-10 w-full md:w-1/3 relative"
              style={{
                backgroundColor: '#F2F2F2',
                backgroundImage: `url('/images/podcast-gradient.png')`,
                backgroundPosition: 'right center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Image
                src="/images/podcasts.webp"
                alt="Podcasts"
                width={537}
                height={201}
                className="absolute bottom-0 right-[42px] w-auto max-h-[190px]"
              />
              <h3 className="text-[20px] text-[#535353] font-semibold leading-[22px]">
                Podcasts
              </h3>
              <p className="text-[#535353] text-[14px] font-medium leading-[20px] mt-2">
                Podcasts featuring <br />
                insightful discussions on <br />
                India’s growth story
              </p>
            </div>
            <div
              className="px-4 py-10 md:p-10 w-full md:w-1/3 relative"
              style={{
                backgroundColor: '#D4EBE0',
                backgroundImage: `url('/images/event-gradient.png')`,
                backgroundPosition: 'right center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Image
                src="/images/events.webp"
                alt="Events"
                width={459}
                height={414}
                className="absolute -top-4 right-4 w-auto max-h-[140px] md:max-h-[160px]"
              />
              <h3 className="text-[20px] text-[#046A38] font-semibold leading-[22px]">
                Events
              </h3>
              <p className="text-[#046A38] text-[14px] font-medium leading-[20px] mt-2">
                Events to engage, <br />
                learn, and collaborate <br />
                with leaders
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white shadow-brand w-full p-4 md:p-6">
        <div className="bg-[#efefef] min-h-[500px] relative overflow-hidden">
          <div className="animated-radial-gradient right-[120px] md:right-[180px] top-[50px] md:top-1/2 -translate-y-1/2" />
          <div className="animated-radial-gradient animated-radial-gradient-small left-[50px] md:left-[50px] bottom-[50px] md:-bottom-1/2 -translate-y-1/2" />
          <div className="tq-container md:py-[100px] py-[50px] relative z-10">
            <span className="text-[#888888] text-[14px] mb-2 font-extrabold uppercase tracking-widest">
              SHARE YOUR VISION
            </span>
            <h2 className="text-[44px] font-bold leading-[50px] text-[#434343] md:text-[48px] md:leading-[48px] mb-[30px] mt-2">
              What Is Your Dream For India&apos;s Future?
            </h2>
            <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[36px] text-[#141414] md:mb-[80px] mb-[30px]">
              We invite you to explore the ideas, ambitions, and forces driving
              India toward its next horizon. <br />
              Contact us to share your ideas.
            </p>
            <Link href="/contact-us">
              <Button className="w-full md:w-auto">Contact us</Button>
            </Link>
          </div>
          <Image
            src="/images/city-infographic.webp"
            alt="Share Your Vision"
            width={2755}
            height={728}
            className="absolute bottom-0 right-0 w-auto h-auto max-h-[230px] z-10 hidden md:block"
          />
          <Image
            src="/images/city-infographic-small.png"
            alt="Share Your Vision"
            width={1029}
            height={267}
            className="max-h-[95px] z-10 block md:hidden"
          />
        </div>
      </section>
    </>
  );
}
