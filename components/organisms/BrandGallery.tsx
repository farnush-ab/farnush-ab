"use client";

import { motion } from "framer-motion";
import { brands } from "@/lib/brands";
import { BrandLogo } from "@/components/molecules/BrandLogo";
import { NumberBadge } from "@/components/atoms/NumberBadge";
import { Display } from "@/components/atoms/Typography";
import { ease, duration } from "@/lib/motion";

export function BrandGallery() {
  return (
    <section id="brands" className="bg-bone py-section">
      <div className="mx-auto max-w-editorial px-gutter">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <NumberBadge index={5} label="مجموعه" />
            <Display as="h2" size="md" className="mt-6 text-balance">
              ۸ خانوادهٔ <span className="italic text-terracotta">میراث‌دار</span>،
              <br />
              زیر یک سقف.
            </Display>
          </div>
          <div className="md:col-span-5">
            <p className="font-sans text-base leading-loose text-ink/70">
              برندهایی که می‌بینید، هر یک نمایندهٔ یک مکتب فکری در طراحی صنعتی
              هستند. ما این میراث را نه به‌عنوان فروشنده، بلکه به‌عنوان
              نگه‌دارنده نمایندگی می‌کنیم.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: duration.slow, ease: ease.weighted }}
          className="mt-16 grid grid-cols-2 border-t border-hairline md:grid-cols-4"
        >
          {brands.map((brand) => (
            <BrandLogo key={brand.name} brand={brand} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
