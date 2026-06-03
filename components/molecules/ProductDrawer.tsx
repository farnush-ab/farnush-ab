"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { Button } from "@/components/atoms/Button";
import { Eyebrow } from "@/components/atoms/Typography";
import { ease, duration } from "@/lib/motion";

export function ProductDrawer({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease: ease.weighted }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px]"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: duration.slow, ease: ease.weighted }}
            className="fixed inset-y-0 left-0 z-[70] flex w-full max-w-xl flex-col overflow-y-auto bg-bone shadow-[0_0_60px_-20px_rgba(42,38,32,0.4)]"
          >
            <div className="relative aspect-[5/4] w-full bg-sand">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 768px) 36rem, 100vw"
                className="object-cover"
                priority
              />
              <button
                onClick={onClose}
                aria-label="بستن"
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-bone/85 text-ink transition-colors duration-500 hover:bg-bone"
              >
                ×
              </button>
              <span className="ltr absolute bottom-5 left-5 font-sans text-eyebrow text-bone/95 num">
                LOT · {product.lot}
              </span>
            </div>

            <div className="flex-1 px-10 py-12">
              <Eyebrow>{product.brand}</Eyebrow>
              <h3 className="mt-3 font-display text-display-sm leading-[1.05] text-balance">
                {product.name}
              </h3>
              <p className="ltr mt-1 font-display italic text-ash">
                {product.nameEn}
              </p>

              <p className="mt-8 max-w-column text-base leading-loose text-ink/80">
                {product.descriptor} این قطعه از مجموعهٔ منتخب دیزاین استیشن،
                با تمرکز بر کیفیت لمس، صدا و دوام چند نسلی، انتخاب شده است.
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-y-5 border-y border-hairline py-8">
                <dt className="font-sans text-caption uppercase text-ash">
                  مبدأ
                </dt>
                <dd className="text-sm text-ink">{product.origin}</dd>
                <dt className="font-sans text-caption uppercase text-ash">
                  متریال
                </dt>
                <dd className="text-sm text-ink">{product.material}</dd>
                <dt className="font-sans text-caption uppercase text-ash">
                  دسته
                </dt>
                <dd className="ltr text-sm text-ink num">{product.category.toUpperCase()}</dd>
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button variant="primary">درخواست مشاوره</Button>
                <Button variant="ghost">افزودن به دفترچهٔ پروژه</Button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
