"use client";

import dynamic from "next/dynamic";

const HeroCosmos = dynamic(
  () => import("./HeroCosmos").then((m) => m.HeroCosmos),
  {
    ssr: false,
    loading: () => (
      <section className="relative h-screen min-h-[760px] w-full bg-bone" />
    ),
  },
);

export function HeroCosmosLoader() {
  return <HeroCosmos />;
}
