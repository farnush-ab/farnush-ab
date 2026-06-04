'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { MetaStrip } from './MetaStrip';

const LINKS = [
  { href: '#walkthrough', label: 'اتاق' },
  { href: '#brands', label: 'برندها' },
  { href: '#smartlab', label: 'آزمایشگاه' },
  { href: '#reserve', label: 'تماس' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        'fixed top-0 inset-x-0 z-[100]',
        'grid grid-cols-[auto_1fr_auto_auto] items-center gap-8',
        'px-gutter py-6',
        'transition-all duration-glance ease-glance',
        'border-b border-transparent',
        scrolled && 'bg-bone/85 backdrop-blur-glass py-4 border-rule',
      )}
    >
      <Link href="/" className="font-display italic text-[1.15rem] leading-none text-ink">
        دیزاین استیشن
        <span className="block font-sans text-[0.6rem] tracking-[0.18em] opacity-70 mt-[3px] font-normal">
          پالادیوم · تهران
        </span>
      </Link>

      <MetaStrip
        variant="nav"
        className="justify-self-center text-cap tracking-[0.08em] text-ink-soft"
      />

      <ul className="hidden md:flex gap-9 text-cap text-ink-soft tracking-[0.08em]">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="relative py-2 hover:text-ink transition-colors duration-glance ease-glance"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-terracotta scale-x-0 origin-[inline-start] transition-transform duration-reveal ease-reveal hover:scale-x-100" />
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="#reserve"
        className={clsx(
          'inline-flex items-center gap-2',
          'px-5 py-2.5 rounded-full',
          'bg-ink text-bone text-cap tracking-[0.08em]',
          'whitespace-nowrap',
          'transition-colors duration-glance ease-glance',
          'hover:bg-terracotta-deep',
        )}
      >
        رزرو ملاقات
      </Link>
    </nav>
  );
}
