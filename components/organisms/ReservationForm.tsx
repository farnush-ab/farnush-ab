"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NumberBadge } from "@/components/atoms/NumberBadge";
import { Display, Eyebrow } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { ease, duration } from "@/lib/motion";

type Step = 0 | 1 | 2 | 3;

const intents = [
  { id: "architect", label: "آرشیتکت / استودیو", helper: "همکاری پروژه‌محور" },
  { id: "private", label: "صاحب پروژهٔ شخصی", helper: "ویلا، پنت‌هاوس" },
  { id: "developer", label: "توسعه‌دهندهٔ ملکی", helper: "بِرَند رزیدنس" },
  { id: "press", label: "رسانه و مطبوعات", helper: "بازدید تحریریه" },
];

const slots = [
  "شنبه ۱۵ تیر — ۱۴:۰۰",
  "یکشنبه ۱۶ تیر — ۱۶:۳۰",
  "سه‌شنبه ۱۸ تیر — ۱۱:۰۰",
  "چهارشنبه ۱۹ تیر — ۱۸:۰۰",
];

export function ReservationForm({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState<Step>(0);
  const [intent, setIntent] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const next = () => setStep((s) => (Math.min(3, s + 1) as Step));
  const prev = () => setStep((s) => (Math.max(0, s - 1) as Step));

  const canNext = (step === 0 && intent) || (step === 1 && slot) || (step === 2 && name && phone);

  return (
    <section
      id="reserve"
      className={`relative bg-bone ${compact ? "py-section" : "min-h-screen py-section"}`}
    >
      <div className="mx-auto max-w-editorial px-gutter">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <NumberBadge index={6} label="رزرو" />
            <Display as="h2" size="md" className="mt-6 text-balance">
              یک <span className="italic text-terracotta">میز</span>،
              <br />
              یک گفت‌وگو، یک پروژه.
            </Display>
            <p className="mt-8 max-w-column font-sans text-base leading-loose text-ink/75">
              میز همکاری در شوروم پالادیوم برای ۹۰ دقیقه در اختیار شماست —
              همراه با کاتالوگ‌های فیزیکی، نمونه‌های متریال، و کارشناس
              اختصاصی.
            </p>

            <div className="mt-12 space-y-4 border-t border-hairline pt-8">
              <SummaryRow label="مأموریت" value={intents.find((i) => i.id === intent)?.label} />
              <SummaryRow label="زمان" value={slot ?? undefined} />
              <SummaryRow label="میهمان" value={name ? `${name}${phone ? ` · ${phone}` : ""}` : undefined} />
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="border border-hairline bg-bone/60 p-10 md:p-14">
              <div className="mb-10 flex items-center justify-between">
                <Eyebrow>گام {step + 1} از ۳</Eyebrow>
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`h-1 w-10 transition-colors duration-700 ease-weighted ${
                        i <= step ? "bg-ink" : "bg-hairline"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="intent"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: duration.base, ease: ease.weighted }}
                  >
                    <h3 className="font-display text-display-sm">
                      شما به چه دلیل به ما می‌پیوندید؟
                    </h3>
                    <div className="mt-8 grid gap-3">
                      {intents.map((i) => (
                        <OptionRow
                          key={i.id}
                          label={i.label}
                          helper={i.helper}
                          active={intent === i.id}
                          onClick={() => setIntent(i.id)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="slot"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: duration.base, ease: ease.weighted }}
                  >
                    <h3 className="font-display text-display-sm">
                      کدام زمان مناسب شماست؟
                    </h3>
                    <div className="mt-8 grid gap-3">
                      {slots.map((s) => (
                        <OptionRow
                          key={s}
                          label={s}
                          active={slot === s}
                          onClick={() => setSlot(s)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: duration.base, ease: ease.weighted }}
                  >
                    <h3 className="font-display text-display-sm">
                      چگونه به شما خوش‌آمد بگوییم؟
                    </h3>
                    <div className="mt-8 space-y-6">
                      <Field
                        label="نام و نام خانوادگی"
                        value={name}
                        onChange={setName}
                        placeholder="فرناز اَردکانی"
                      />
                      <Field
                        label="شمارهٔ تماس"
                        value={phone}
                        onChange={setPhone}
                        placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰"
                        ltr
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: duration.slow, ease: ease.weighted }}
                  >
                    <h3 className="font-display text-display-sm">
                      ثبت شد. <span className="italic text-terracotta">منتظرتانیم.</span>
                    </h3>
                    <p className="mt-6 max-w-column font-sans text-base leading-loose text-ink/75">
                      یک پیامک تأیید با کد رزرو و آدرس دقیق برایتان ارسال
                      می‌شود. در صورت تغییر، تا ۲۴ ساعت قبل قابل ویرایش است.
                    </p>
                    <Divider className="my-10" />
                    <Eyebrow>کد رزرو</Eyebrow>
                    <p className="ltr mt-2 font-display text-display-sm num">
                      DS · 24 · 0{Math.floor(Math.random() * 900) + 100}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {step < 3 && (
                <div className="mt-12 flex items-center justify-between">
                  <button
                    onClick={prev}
                    disabled={step === 0}
                    className="font-sans text-sm text-ash transition-colors duration-400 hover:text-ink disabled:opacity-40"
                  >
                    ← گام قبل
                  </button>
                  <Button
                    disabled={!canNext}
                    onClick={next}
                    className="disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {step === 2 ? "تأیید رزرو" : "ادامه"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-hairline pb-3">
      <Eyebrow>{label}</Eyebrow>
      <span className="font-sans text-sm text-ink">
        {value ?? <span className="text-ash/50">— هنوز انتخاب نشده</span>}
      </span>
    </div>
  );
}

function OptionRow({
  label,
  helper,
  active,
  onClick,
}: {
  label: string;
  helper?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center justify-between border px-5 py-5 text-right transition-all duration-500 ease-weighted ${
        active
          ? "border-ink bg-ink text-bone"
          : "border-hairline bg-transparent text-ink hover:border-ink/50"
      }`}
    >
      <div>
        <p className="font-display text-xl">{label}</p>
        {helper && (
          <p
            className={`mt-1 font-sans text-caption ${
              active ? "text-bone/70" : "text-ash"
            }`}
          >
            {helper}
          </p>
        )}
      </div>
      <span
        aria-hidden
        className={`h-2.5 w-2.5 rounded-full border transition-colors duration-500 ${
          active ? "border-bone bg-bone" : "border-ink/30"
        }`}
      />
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  ltr,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ltr?: boolean;
}) {
  return (
    <label className="block">
      <Eyebrow>{label}</Eyebrow>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir={ltr ? "ltr" : "rtl"}
        className="mt-2 w-full border-b border-hairline bg-transparent py-3 font-display text-2xl text-ink placeholder:text-ash/50 focus:border-ink focus:outline-none"
      />
    </label>
  );
}
