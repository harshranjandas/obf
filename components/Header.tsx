'use client';

import Link from 'next/link';
import type React from 'react';
import { useEffect, useState, startTransition } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import CloseIcon from '@/components/icons/CloseIcon';
import MenuIcon from '@/components/icons/MenuIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

const menuLinks = [
  { label: 'Advisors', href: '/advisors' },
  { label: 'Partners', href: '/partners' },
  { label: 'Team', href: '/team' },
  { label: 'Jobs', href: '/jobs' },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    if (pathname != null) {
      startTransition(() => setMobileMenuOpen(false));
    }
  }, [pathname]);

  return (
    <header className="relative isolate sticky top-0 z-50 bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.08)]">
      <div className="absolute right-0 top-[-10px] flex h-[4px] w-[100px] items-center justify-between md:top-[-14px]" aria-hidden>
        <div className="h-full w-1/3 bg-[#FF671F]" />
        <div className="h-full w-1/3 bg-white" />
        <div className="h-full w-1/3 bg-[#046A38]" />
      </div>

      <div className="tq-container relative flex min-h-[118px] items-center justify-between gap-6 py-4 md:px-6">
        {/* Logo – design: left */}
        <Link href="/" className="shrink-0" aria-label="One Big Future home">
          <Image
            src="/logo.svg"
            alt="One Big Future"
            width={101}
            height={54}
            className="h-[42px] w-auto md:h-[54px]"
          />
        </Link>

        {/* Desktop: Contact Us (design Frame32) + nav with dividers (design Frame21) */}
        <div className="hidden md:flex md:flex-col md:items-end">
          {/* Contact us – design: h-[34px], text 12px, rounded-[12px], icon 28px white rounded-[10px] */}
          <div className="mb-5 flex items-center">
            <Link
              href="/contact-us"
              className="relative flex h-[34px] items-center rounded-[12px] bg-[#ef671f] pl-5 pr-8 py-3 text-[12px] font-semibold uppercase tracking-[1.65px] text-white transition-colors hover:bg-[#d85a1a]"
            >
              Contact us
              <span className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-[10px] bg-white text-[#ef671f]">
                <ArrowRightIcon size={16} />
              </span>
            </Link>
          </div>
          {/* Nav – design: vertical divider between each, gap 30px, 12px #222, active bold */}
          <nav aria-label="Main navigation" className="relative z-10 border-t border-[#EFEEEC] pt-5">
            <ul className="m-0 flex list-none items-center gap-0 p-0">
              {menuLinks.map((link, index) => (
                <li
                  key={link.href}
                  className={clsx(
                    'flex h-8 items-center border-[#EFEEEC] py-0 pr-[30px] pl-[30px] first:pl-0 last:pr-0',
                    index > 0 && 'border-l'
                  )}
                >
                  <Link
                    href={link.href}
                    prefetch={false}
                    className={clsx(
                      'relative z-10 block py-2 text-[12px] uppercase tracking-[1px] text-[#222] transition-all hover:font-bold cursor-pointer',
                      isActive(link.href) ? 'font-bold' : 'font-medium'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#efeeec] text-[#141414] transition-colors hover:border-[#ef671f] hover:text-[#000] md:hidden"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
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
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-[#ef671f] py-3 px-5 text-[12px] font-semibold uppercase tracking-[1.65px] text-white hover:bg-[#d85a1a]"
              >
                Contact us
                <ArrowRightIcon size={16} />
              </Link>
              <nav>
                <ul className="flex flex-col gap-1">
                  {menuLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        onClick={() => setMobileMenuOpen(false)}
                        className={clsx(
                          'block rounded px-4 py-3 text-[12px] uppercase tracking-[1px] transition-colors cursor-pointer',
                          isActive(link.href)
                            ? 'bg-[#f7f5f3] font-bold text-[#222]'
                            : 'font-medium text-[#222] hover:bg-[#f7f5f3]'
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
