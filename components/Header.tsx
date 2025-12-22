'use client';

import Link from 'next/link';
import React, { useEffect, useState, startTransition } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import CloseIcon from '@/components/icons/CloseIcon';
import MenuIcon from '@/components/icons/MenuIcon';
import Button from './ui/Button';

const menuLinks = [
  {
    label: 'Advisors',
    href: '/advisor',
  },
  {
    label: 'Partners',
    href: '/partners',
  },
  {
    label: 'Team',
    href: '/team',
  },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    startTransition(() => {
      setMobileMenuOpen(false);
    });
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-brand">
      <div className="tq-container flex items-center justify-between gap-4 p-[20px_16px] md:p-[14px_24px_22px_24px]">
        <Link href="/" className="max-w-[101px]">
          <Image
            src="/logo.svg"
            alt="T9L Ventures"
            width={101}
            height={54}
            quality={100}
          />
        </Link>

        <div className="hidden flex-col items-end md:flex">
          <div className="mb-[14px]">
            <Button variant="secondary">Contact us</Button>
          </div>
          <nav className="border-t border-[#efeeec] pt-[20px]">
            <ul className="m-0 flex list-none gap-[60px] p-0">
              {menuLinks.map((link) => (
                <li
                  key={link.href}
                  className="relative leading-[18px] after:absolute after:right-[-30px] after:top-1/2 after:h-[18px] after:w-px after:-translate-y-1/2 after:bg-[#efeeec] after:content-[''] last:after:hidden"
                >
                  <Link
                    href={link.href}
                    className={clsx(
                      'group inline-block text-[12px] font-medium uppercase tracking-[1px] text-[#2f2f2f] transition-colors duration-500 hover:text-[#000]',
                      isActive(link.href) && 'text-black'
                    )}
                    data-text={link.label}
                  >
                    <span className="relative inline-block">
                      <span
                        aria-hidden="true"
                        className="block font-bold opacity-0"
                      >
                        {link.label}
                      </span>
                      <span
                        className={clsx(
                          'absolute inset-0 block transition-opacity duration-300',
                          isActive(link.href)
                            ? 'opacity-0'
                            : 'opacity-100 group-hover:opacity-0'
                        )}
                      >
                        {link.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className={clsx(
                          'absolute inset-0 block font-bold transition-opacity duration-300',
                          isActive(link.href)
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                        )}
                      >
                        {link.label}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-[#efeeec] text-[#141414] transition-colors duration-300 hover:border-[#ffd231] hover:text-[#000] md:hidden"
          aria-label={
            mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="border-t border-[#efeeec] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)] md:hidden"
          >
            <div className="tq-container flex flex-col gap-6 py-6">
              <Button
                variant="secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact us
              </Button>
              <nav>
                <ul className="flex flex-col gap-3">
                  {menuLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={clsx(
                          'block px-4 py-2 text-[12px] uppercase tracking-[1px] transition-colors duration-200',
                          isActive(link.href)
                            ? 'bg-[#f7f5f3] font-semibold text-black'
                            : 'text-black hover:bg-[#f7f5f3] hover:text-black'
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
