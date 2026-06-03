"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Pin } from "@/components/atoms/Pin";
import { HotspotTooltip } from "@/components/molecules/HotspotTooltip";
import { ProductDrawer } from "@/components/molecules/ProductDrawer";
import { NumberBadge } from "@/components/atoms/NumberBadge";
import { Display, Eyebrow } from "@/components/atoms/Typography";
import { lookbookScenes, products, type Product } from "@/lib/products";
import { ease, duration } from "@/lib/motion";

export function Lookbook() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [active, setActive] = useState<Product | null>(null);
  const [hover, setHover] = useState<{ id: string; x: number; y: number } | null>(null);

  const scene = lookbookScenes[sceneIdx];

  const findProduct = (id: string) => products.find((p) => p.id === id);

  return (
    <section id="lookbook" className="bg-bone py-section">
      <div className="mx-auto max-w-editorial px-gutter">
        <div className="flex items-end justify-between">
          <div className="max-w-2xl">
            <NumberBadge index={3} label="لوک‌بوک" />
            <Display as="h2" size="md" className="mt-6 text-balance">
              فضاهایی که <span className="italic text-terracotta">سکوت</span>،
              در آن‌ها سرمایه‌گذاری شده است.
            </Display>
          </div>
          <div className="hidden gap-2 md:flex">
            {lookbookScenes.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setSceneIdx(i);
                  setActive(null);
                }}
                className={`group flex items-center gap-3 border-b px-1 pb-2 font-sans text-sm transition-colors duration-500 ${
                  i === sceneIdx
                    ? "border-ink text-ink"
                    : "border-transparent text-ash hover:text-ink"
                }`}
              >
                <span className="ltr num text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="relative mt-14 aspect-[16/9] w-full overflow-hidden bg-sand"
          onMouseLeave={() => setHover(null)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: duration.slow, ease: ease.weighted }}
              className="absolute inset-0"
            >
              <Image
                src={scene.image}
                alt={scene.title}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 left-6 z-10 text-bone">
            <Eyebrow className="text-bone/80">{scene.subtitle}</Eyebrow>
            <p className="mt-1 font-display text-2xl">{scene.title}</p>
          </div>

          {scene.hotspots.map((h, i) => {
            const product = findProduct(h.productId);
            if (!product) return null;
            return (
              <div
                key={`${scene.id}-${i}`}
                onMouseEnter={() => setHover({ id: product.id, x: h.x, y: h.y })}
              >
                <Pin
                  x={h.x}
                  y={h.y}
                  label={product.name}
                  active={hover?.id === product.id}
                  onActivate={() => setActive(product)}
                />
              </div>
            );
          })}

          <AnimatePresence>
            {hover && (() => {
              const p = findProduct(hover.id);
              if (!p) return null;
              return (
                <HotspotTooltip
                  key={hover.id}
                  name={p.name}
                  descriptor={p.descriptor}
                  x={hover.x}
                  y={hover.y}
                />
              );
            })()}
          </AnimatePresence>
        </div>

        <p className="mt-6 font-sans text-caption text-ash">
          نقاط روشن را لمس کنید — هر «پین»، روایتی پشت طراحی است.
        </p>
      </div>

      <ProductDrawer product={active} onClose={() => setActive(null)} />
    </section>
  );
}
