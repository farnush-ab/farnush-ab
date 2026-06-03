"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, duration } from "@/lib/motion";

const links = [
  { href: "/#lookbook", label: "لوک‌بوک" },
  { href: "/#showroom", label: "شوروم" },
  { href: "/#brands", label: "برندها" },
  { href: "/reserve", label: "رزرو میز" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-weighted",
        scrolled
          ? "bg-bone/85 backdrop-blur-md border-b border-hairline"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-editorial items-center justify-between px-gutter py-5">
        <Link
          href="/"
          className="flex items-baseline gap-2 font-display text-xl tracking-tight text-ink"
        >
          <span className="italic">Design</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-terracotta" />
          <span>Station</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative font-sans text-sm text-ink/75 transition-colors duration-400 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <AnimatePresence>
            {scrolled && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: duration.quick, ease: ease.weighted }}
                className="ltr font-sans text-eyebrow text-ash/80 num"
              >
                PALLADIUM · TEHRAN
              </motion.span>
            )}
          </AnimatePresence>
          <Link
            href="/reserve"
            className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2 font-sans text-xs tracking-[0.12em] text-ink transition-colors duration-500 ease-weighted hover:bg-ink hover:text-bone"
          >
            رزرو میز
          </Link>
        </div>
      </div>
    </header>
  );
}
