'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MetaStrip } from '@/components/molecules/MetaStrip';
import { Cap } from '@/components/atoms/Type';

const NAV = [
  { href: '#hero', label: 'خانه' },
  { href: '#walkthrough', label: 'اتاق' },
  { href: '#brands', label: 'برندها' },
  { href: '#smartlab', label: 'آزمایشگاه' },
  { href: '#reserve', label: 'رزرو ملاقات' },
];

const SOCIAL = ['IG', 'in', 'P', 'W'];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-umber text-bone pt-section pb-6 px-gutter border-t border-bone/8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr] gap-12 lg:gap-16 mb-12">
        <div>
          <h3 className="font-display italic text-3xl mb-3 leading-none">دیزاین استیشن</h3>
          <p className="text-bone/55 leading-7 max-w-[36ch] text-[0.9rem]">
            گلچینی از بهترین برندهای جهان در شیرآلاتِ لاکچری، نورِ معماری و خانه‌ی هوشمند. در قلبِ پالادیوم، تهران — با هماهنگی قبلی، از سال ۲۰۱۹.
          </p>
          <div className="flex gap-2 mt-5">
            {SOCIAL.map((s) => (
              <Link
                key={s}
                href="#"
                className="w-9 h-9 rounded-full border border-bone/20 grid place-items-center text-bone/65 hover:bg-terracotta hover:border-terracotta hover:text-bone transition-colors duration-glance ease-glance text-[0.8rem]"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <Cap className="text-bone/45 mb-5 block">پیمایش</Cap>
          <ul className="space-y-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-bone/78 text-[0.9rem] hover:text-terracotta-soft transition-colors duration-glance ease-glance"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Cap className="text-bone/45 mb-5 block">تماس</Cap>
          <dl className="space-y-1">
            <dt className="text-[0.6rem] tracking-[0.08em] text-bone/40 mt-0">نشانی</dt>
            <dd className="font-display italic text-[1.05rem] leading-snug">
              مرکزِ خریدِ پالادیوم<br />طبقه‌ی ۴ · زعفرانیه<br />تهران
            </dd>
            <dt className="text-[0.6rem] tracking-[0.08em] text-bone/40 mt-4">ساعتِ کاری</dt>
            <dd className="font-display italic text-[1.05rem] leading-snug">
              سه‌شنبه — شنبه<br />۱۱:۰۰ — ۲۲:۰۰
            </dd>
            <dt className="text-[0.6rem] tracking-[0.08em] text-bone/40 mt-4">تماسِ مستقیم</dt>
            <dd className="font-display italic text-[1.05rem]" dir="ltr">+98 21 8888 0000</dd>
          </dl>
        </div>

        <div>
          <Cap className="text-bone/45 mb-3 block">خبرنامه</Cap>
          <p className="text-bone/55 text-[0.86rem] leading-6 mb-3">
            هر دو ماه یک‌بار، گزیده‌ای از محصولاتِ تازه و پروژه‌های اجراشده. بدون اسپم.
          </p>
          <form
            className="flex items-center border border-bone/20 rounded-full overflow-hidden bg-bone/5 focus-within:border-terracotta"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) {
                setSubscribed(true);
                setEmail('');
                setTimeout(() => setSubscribed(false), 2400);
              }
            }}
          >
            <input
              type="email"
              required
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیلِ شما"
              className="flex-1 bg-transparent border-0 outline-none px-5 py-3 text-bone text-[0.85rem] placeholder-bone/40"
            />
            <button
              type="submit"
              className="bg-terracotta text-bone px-5 py-3 text-cap tracking-[0.08em] hover:bg-terracotta-soft hover:text-ink transition-colors duration-glance ease-glance"
            >
              {subscribed ? 'ثبت شد ✓' : 'عضو شو'}
            </button>
          </form>
          <dl className="mt-6">
            <dt className="text-[0.6rem] tracking-[0.08em] text-bone/40">استودیو</dt>
            <dd className="font-display italic text-[1.05rem]" dir="ltr">
              studio@designstation.ir
            </dd>
          </dl>
        </div>
      </div>

      <div className="border-t border-bone/8 pt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-center text-[0.6rem] tracking-[0.08em] text-bone/45">
        <span>© دیزاین استیشن · ۱۴۰۵</span>
        <span className="justify-self-center flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-terracotta" />
          <MetaStrip variant="footer" />
          <span className="w-1 h-1 rounded-full bg-terracotta" />
        </span>
        <span className="sm:justify-self-end">با هماهنگی قبلی، از ۲۰۱۹</span>
      </div>
    </footer>
  );
}
