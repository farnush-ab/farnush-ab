"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { NumberBadge } from "@/components/atoms/NumberBadge";
import { Display, Eyebrow } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { ease } from "@/lib/motion";

const stats = [
  { value: "۶,۰۰۰", unit: "m²", label: "مساحت شوروم" },
  { value: "۲۲", unit: "برند", label: "نمایندگی رسمی" },
  { value: "۲۴۰", unit: "پروژه", label: "همکاری معمارانه" },
  { value: "۱۲", unit: "سال", label: "حضور در پالادیوم" },
];

export function ShowroomStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "10%"]);

  return (
    <section id="showroom" className="relative bg-bone py-section">
      <div className="mx-auto max-w-editorial px-gutter">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <NumberBadge index={4} label="شوروم" />
            <Display as="h2" size="md" className="mt-6 text-balance">
              یک <span className="italic text-terracotta">قرارگاه</span> معماری
              در قلب پالادیوم.
            </Display>
            <p className="mt-8 max-w-column font-sans text-base leading-loose text-ink/75">
              فضایی شش‌هزار متری که فقط ویترین نیست؛ کارگاه فکر، میز همکاری
              معماران، و آزمایشگاه لمسِ متریال است. شب‌های پنج‌شنبه میزبان
              نشست‌های طراحی هستیم.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button variant="primary">رزرو میز همکاری</Button>
              <Button variant="ghost">برنامهٔ نشست‌ها</Button>
            </div>

            <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-hairline pt-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.7, ease: ease.weighted, delay: i * 0.06 }}
                >
                  <dt className="font-display text-display-sm leading-none num">
                    <span>{s.value}</span>
                    <span className="ltr ml-1 align-baseline text-base italic text-gold">
                      {s.unit}
                    </span>
                  </dt>
                  <dd className="mt-2">
                    <Eyebrow>{s.label}</Eyebrow>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>

          <div ref={ref} className="md:col-span-7">
            <div className="sticky top-24 grid gap-6">
              <motion.div
                style={{ y }}
                className="relative aspect-[4/5] w-full overflow-hidden bg-sand"
              >
                <Image
                  src="https://images.unsplash.com/photo-1615873968403-89e068629265?w=2000&q=85&auto=format&fit=crop"
                  alt="شوروم دیزاین استیشن"
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                />
                <span className="ltr absolute bottom-5 left-5 font-sans text-eyebrow text-bone num">
                  FRAME · 02
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
