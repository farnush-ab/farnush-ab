"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { Eyebrow } from "@/components/atoms/Typography";
import { ease, duration } from "@/lib/motion";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: duration.base, ease: ease.weighted, delay: index * 0.06 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand">
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 1.2, ease: ease.weighted }}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        </motion.div>
        <span className="ltr absolute bottom-4 left-4 font-sans text-eyebrow text-bone/95 num">
          {product.lot}
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 hairline pb-4">
        <div>
          <Eyebrow>{product.brand}</Eyebrow>
          <h3 className="mt-1.5 font-display text-2xl leading-tight">
            {product.name}
          </h3>
        </div>
        <span className="font-sans text-caption text-ash">{product.origin}</span>
      </div>
      <p className="mt-4 font-sans text-sm leading-relaxed text-ink/70">
        {product.descriptor}
      </p>
    </motion.article>
  );
}
