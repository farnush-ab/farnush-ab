'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Cap, Display } from '@/components/atoms/Type';
import { FloatingInput } from '@/components/molecules/FloatingInput';
import { SubmitPill } from '@/components/molecules/SubmitPill';
import { TimeSlot } from '@/components/molecules/TimeSlot';
import { T, fadeUp } from '@/lib/motion/presets';

const INTENTS = [
  'تعیین مشخصاتِ پروژه',
  'ارائه به مشتری',
  'مشاوره‌ی متریال',
  'بازدیدِ ساکت',
];

export function ReservationWidget() {
  const [intent, setIntent] = useState(0);
  const [dayIdx, setDayIdx] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const days = useMemo(() => {
    const arr: Date[] = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, []);

  return (
    <section id="reserve" className="bg-umber text-bone py-section px-gutter">
      <motion.header
        className="text-center mb-12 sm:mb-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <Display as="h2" className="text-h2 max-w-[20ch] mx-auto text-bone">
          یک عصرِ آرام،<br />
          در <em className="not-italic text-terracotta-soft">میزِ اجتماعی.</em>
        </Display>
        <p className="mt-4 max-w-[42ch] mx-auto text-bone/65">
          زمانِ خود را انتخاب کنید. ظرفِ چهار ساعتِ کاری با تأییدِ نهایی و یک بنچِ آماده تماس می‌گیریم.
        </p>
      </motion.header>

      {submitted ? (
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={T.reveal}
        >
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-terracotta grid place-items-center text-bone text-2xl">
            ✓
          </div>
          <h3 className="font-display italic text-2xl mb-2">درخواستِ شما ثبت شد.</h3>
          <p className="text-bone/65">
            ظرفِ چهار ساعتِ کاری با شما تماس می‌گیریم — با زمانِ تأیید شده و یک دعوت‌نامه‌ی PDF برای فوروارد به مشتری.
          </p>
        </motion.div>
      ) : (
        <motion.form
          className="max-w-[920px] mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-bone/10 border border-bone/10 rounded-lg overflow-hidden">
            {/* Step 1 — Intent */}
            <div className="p-7 bg-umber/85">
              <Cap className="text-bone/55 mb-5 block">۰۱ · نیت</Cap>
              <ul className="space-y-1">
                {INTENTS.map((label, i) => (
                  <li key={label}>
                    <label
                      className="flex items-center gap-3 px-3 py-2.5 rounded transition-colors duration-glance ease-glance hover:bg-bone/5"
                      data-hover
                    >
                      <input
                        type="radio"
                        name="intent"
                        checked={intent === i}
                        onChange={() => setIntent(i)}
                        className="appearance-none w-3.5 h-3.5 rounded-full border border-bone/40 checked:border-terracotta checked:bg-terracotta/40 transition-all duration-glance ease-glance"
                      />
                      <span className="text-[0.95rem]">{label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step 2 — Date */}
            <div className="p-7 bg-umber/85">
              <Cap className="text-bone/55 mb-5 block">۰۲ · تاریخ</Cap>
              <div className="grid grid-cols-7 gap-1">
                {days.map((d, i) => (
                  <TimeSlot
                    key={i}
                    date={d}
                    active={dayIdx === i}
                    onClick={() => setDayIdx(i)}
                  />
                ))}
              </div>
              <p className="mt-4 text-[0.62rem] tracking-[0.08em] text-bone/50">
                ساعتِ تماس را با شما هماهنگ می‌کنیم.
              </p>
            </div>

            {/* Step 3 — Contact */}
            <div className="p-7 bg-umber/85 flex flex-col gap-2">
              <Cap className="text-bone/55 mb-2 block">۰۳ · تماس</Cap>
              <FloatingInput label="نام و نام خانوادگی" required name="name" />
              <FloatingInput label="شماره‌ی تماس" required name="phone" ltr type="tel" />
              <FloatingInput label="ایمیل (اختیاری)" name="email" ltr type="email" />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <SubmitPill type="submit">
              ثبتِ درخواست
              <span className="rtl:scale-x-[-1]">→</span>
            </SubmitPill>
          </div>
        </motion.form>
      )}
    </section>
  );
}
