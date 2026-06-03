import Link from "next/link";
import { Divider } from "@/components/atoms/Divider";
import { Eyebrow } from "@/components/atoms/Typography";

export function Footer() {
  return (
    <footer className="mt-section bg-bone text-ink">
      <div className="mx-auto max-w-editorial px-gutter pb-12 pt-section">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-display-sm leading-[1.05] text-balance">
              همان <span className="italic">آرامش</span> که در شوروم احساس
              می‌کنید، <br className="hidden md:block" />
              در این صفحه نیز جاری است.
            </p>
          </div>

          <div className="md:col-span-3">
            <Eyebrow>نشانی</Eyebrow>
            <p className="mt-4 text-sm leading-loose text-ink/75">
              تهران، خیابان فرشته،
              <br />
              مرکز خرید پالادیوم، طبقهٔ منفی یک
              <br />
              <span className="ltr inline-block num pt-2 text-ash">
                +98 21 8807 1414
              </span>
            </p>
          </div>

          <div className="md:col-span-2">
            <Eyebrow>ساعات</Eyebrow>
            <p className="mt-4 text-sm leading-loose text-ink/75 num">
              شنبه — چهارشنبه
              <br />
              ۱۱:۰۰ — ۲۲:۰۰
              <br />
              <span className="block pt-2 text-ash">جمعه: با رزرو قبلی</span>
            </p>
          </div>

          <div className="md:col-span-2">
            <Eyebrow>پیوندها</Eyebrow>
            <ul className="mt-4 space-y-2 text-sm text-ink/75">
              <li>
                <Link href="/reserve" className="hover:text-ink">
                  رزرو میز
                </Link>
              </li>
              <li>
                <Link href="#brands" className="hover:text-ink">
                  مجموعهٔ برندها
                </Link>
              </li>
              <li>
                <Link href="#lookbook" className="hover:text-ink">
                  لوک‌بوک پروژه‌ها
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Divider className="my-12" />

        <div className="flex flex-col-reverse items-start justify-between gap-6 md:flex-row md:items-end">
          <p className="ltr font-display text-display-lg leading-none text-ink/90">
            Design Station
          </p>
          <p className="font-sans text-caption text-ash/70 num">
            <span className="ltr">© {new Date().getFullYear()}</span> ·
            معماری و توسعهٔ دیجیتال · پالادیوم تهران
          </p>
        </div>
      </div>
    </footer>
  );
}
