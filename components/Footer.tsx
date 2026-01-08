import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const links = [
  {
    label: 'Advisors',
    href: '/advisors',
  },
  {
    label: 'Partners',
    href: '/partners',
  },
  {
    label: 'Contact Us',
    href: '/contact-us',
  },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white pb-[30px] pt-[50px] md:pb-[50px] md:pt-[100px]">
      <div className="tq-container flex flex-col">
        <div className="mb-0 flex flex-col gap-0 md:mb-[50px] md:flex-row">
          <div className="w-full md:w-[55%]">
            <h3 className="mb-[20px] text-[15px] font-normal uppercase leading-[28px] tracking-[2px] text-black">
              India’s future as imagined by OUR leaders
            </h3>
            <p className="mb-[30px] pr-2 text-[14px] leading-[24px] text-[#999]">
              One Big Future is a platform for leaders to share their vision for
              India’s <br />
              tomorrow and the pathways to turn these possibilities into
              reality.
            </p>
            <p className="mb-[40px] text-[15px] font-normal uppercase leading-[28px] tracking-[2px] text-black items-center hidden md:flex">
              A{' '}
              <Image
                src="/images/t9l.png"
                alt="T9L"
                width={30.21}
                height={15.2}
                className="object-contain mx-2"
              />
              initiative in partnership with{' '}
              <Image
                src="/images/iamai.png"
                alt="IAMAI"
                width={52}
                height={29}
                className="object-contain pl-2"
              />
            </p>
            <div className="mb-[30px] flex items-center gap-4 md:mb-0">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center text-black cursor-not-allowed"
              >
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center text-black cursor-not-allowed"
              >
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center text-black cursor-not-allowed"
              >
                <Image
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Formerly Twitter)"
                className="inline-flex items-center text-black cursor-not-allowed"
              >
                <Image
                  src="/icons/twitter.svg"
                  alt="X (Formerly Twitter)"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>

          <div className="w-full md:w-[45%] md:border-0 md:pt-0">
            <div className="flex w-full flex-col-reverse justify-between md:flex-row">
              <div className="flex h-full w-full flex-col justify-between border-[#d9d9d9] pb-6 md:w-1/2 md:border-l md:pb-0 md:pl-[30px]">
                <div>
                  <p className="mb-[20px] text-[15px] font-normal uppercase leading-[16px] tracking-[2px] text-black">
                    Address
                  </p>
                  <address className="text-sm not-italic leading-6">
                    <p className="my-1 text-[#999]">
                      C7, SDA Commercial Complex
                      <br /> Opposite IIT Campus <br /> New Delhi 110016, India
                    </p>
                  </address>
                </div>
              </div>
              <div className="mb-6 grid w-full grid-cols-1 border-b border-t border-dashed border-[#d9d9d9] pb-6 pt-6 md:mb-0 md:w-2/3 md:border-0 md:border-t-0 md:pb-0 md:pl-[30px] md:pt-0">
                <div className="border-[#d9d9d9] md:border-l md:pl-[30px]">
                  <p className="mb-[20px] text-[15px] font-normal uppercase leading-[16px] tracking-[2px] text-black">
                    One Big Future
                  </p>
                  <ul className="m-0 list-none p-0">
                    {links.map((link) => (
                      <li className="mb-3 last:mb-0" key={link.href}>
                        <Link
                          className="text-[14px] leading-[20px] text-[#999] md:leading-[28px]"
                          href={link.href}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-0 flex items-center justify-between gap-4 border-t border-[#d9d9d9] pt-[30px] md:mb-0 md:pt-[40px]">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="One Big Future"
              width={101}
              height={54}
              className="max-w-[101px] h-auto"
            />
          </Link>
          <p className="text-[12px] uppercase font-normal leading-tight text-black">
            &copy; {year} One Big Future
          </p>
        </div>
      </div>
    </footer>
  );
};
