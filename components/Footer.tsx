'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const links = [
  {
    label: 'Partners',
    href: '/partners',
  },
  {
    label: 'Contact Us',
    href: '/contact-us',
  },
];

// Icon mapping for social networks
const getSocialIcon = (name: string): string => {
  const iconMap: Record<string, string> = {
    'LinkedIn': '/icons/linkedin.svg',
    'Instagram': '/icons/instagram.svg',
    'YouTube': '/icons/youtube.svg',
    'X (Formerly Twitter)': '/icons/twitter.svg',
    'Twitter': '/icons/twitter.svg',
    'Facebook': '/icons/facebook.svg',
  };
  return iconMap[name] || '/icons/linkedin.svg';
};

interface HomepageSettings {
  address: string;
  socialNetworks: Array<{
    name: string;
    url: string;
    enabled: boolean;
    order: number;
  }>;
}

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const [settings, setSettings] = useState<HomepageSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/public/homepage-settings');
        if (response.ok) {
          const data = await response.json();
          setSettings({
            address: data.address || 'C7, SDA Commercial Complex\nOpposite IIT Campus\nNew Delhi 110016, India',
            socialNetworks: data.socialNetworks || [],
          });
        }
      } catch (error) {
        console.error('Error fetching footer settings:', error);
        // Use defaults on error
        setSettings({
          address: 'C7, SDA Commercial Complex\nOpposite IIT Campus\nNew Delhi 110016, India',
          socialNetworks: [],
        });
      }
    };

    fetchSettings();
  }, []);

  // Default social networks if settings not loaded
  const defaultSocialNetworks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/showcase/one-big-future/about/',
      enabled: true,
      order: 0,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/one_big_future/',
      enabled: true,
      order: 1,
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@OneBigFuture',
      enabled: true,
      order: 2,
    },
    {
      name: 'X (Formerly Twitter)',
      url: 'https://x.com/onebigfuture',
      enabled: true,
      order: 3,
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61586251529727',
      enabled: true,
      order: 4,
    },
  ];

  const socialNetworks = settings?.socialNetworks || defaultSocialNetworks;
  const address = settings?.address || 'C7, SDA Commercial Complex\nOpposite IIT Campus\nNew Delhi 110016, India';

  // Filter enabled social networks and sort by order
  const enabledSocialNetworks = socialNetworks
    .filter((network) => network.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <footer className="bg-white pb-[30px] pt-[50px] md:pb-[50px] md:pt-[100px]">
      <div className="tq-container flex flex-col">
        <div className="mb-0 flex flex-col gap-0 md:mb-[50px] md:flex-row">
          <div className="w-full md:w-[55%]">
            <h3 className="mb-[20px] text-[15px] font-normal uppercase leading-[28px] tracking-[2px] text-black">
              India's future as imagined by OUR leaders
            </h3>
            <p className="mb-[30px] pr-2 text-[14px] leading-[24px] text-[#999]">
              One Big Future is a platform for leaders to share their vision for
              India's <br />
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
              {enabledSocialNetworks.map((network) => (
                <a
                  key={network.url}
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={network.name}
                  className="inline-flex items-center text-black"
                >
                  <Image
                    src={getSocialIcon(network.name)}
                    alt={network.name}
                    width={24}
                    height={24}
                  />
                </a>
              ))}
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
                    <p className="my-1 text-[#999] whitespace-pre-line">
                      {address}
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
