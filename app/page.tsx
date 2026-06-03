import { HeroCosmosLoader } from "@/components/organisms/HeroCosmosLoader";
import { HeroMaskText } from "@/components/organisms/HeroMaskText";
import { Lookbook } from "@/components/organisms/Lookbook";
import { ShowroomStory } from "@/components/organisms/ShowroomStory";
import { BrandGallery } from "@/components/organisms/BrandGallery";
import { ReservationForm } from "@/components/organisms/ReservationForm";
import { ProductCard } from "@/components/molecules/ProductCard";
import { NumberBadge } from "@/components/atoms/NumberBadge";
import { Display } from "@/components/atoms/Typography";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <HeroCosmosLoader />
      <HeroMaskText />
      <Lookbook />
      <ShowroomStory />

      <section className="bg-bone py-section">
        <div className="mx-auto max-w-editorial px-gutter">
          <div className="flex items-end justify-between">
            <div className="max-w-2xl">
              <NumberBadge index={5} label="گزیده" />
              <Display as="h2" size="md" className="mt-6 text-balance">
                قطعاتی که این فصل،
                <br />
                <span className="italic text-terracotta">منتخب</span> ما هستند.
              </Display>
            </div>
            <span className="hidden font-sans text-caption text-ash md:block">
              لات‌های فصل پاییز · ۱۴۰۴
            </span>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <BrandGallery />
      <ReservationForm compact />
    </>
  );
}
