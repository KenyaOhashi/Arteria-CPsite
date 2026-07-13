import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MediaSlotImage } from "@/components/ui/MediaSlotImage";
import { CTASection } from "@/components/ui/CTASection";
import {
  brandStory,
  corePhilosophy,
  mvv,
  philosophySteps,
} from "@/content/philosophy";

export const metadata: Metadata = {
  title: "理念",
  description:
    "株式会社Arteriaの理念。学びと仕事と機会をめぐらせる、社会の動脈になる。人と企業と教育の間に循環をつくります。",
  alternates: { canonical: "/philosophy" },
};

export default function PhilosophyPage() {
  return (
    <>
      <PageHeader
        en="PHILOSOPHY"
        title="理念"
        lead="Arteriaという社名は、動脈（Artery）に由来します。学びと仕事と機会を、社会にめぐらせる存在でありたいという想いを込めています。"
      />

      {/* Core Philosophy */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
          <ScrollReveal className="text-center">
            <p className="font-en text-xs font-bold tracking-[0.26em] text-bordeaux">
              CORE PHILOSOPHY
            </p>
            <p className="mt-8 font-serif-jp text-2xl font-semibold leading-[1.9] tracking-wide text-ink md:text-4xl md:leading-[1.9]">
              {corePhilosophy.main}
              <br />
              <span className="text-bordeaux">{corePhilosophy.sub}</span>
            </p>
          </ScrollReveal>

          <div className="mx-auto mt-16 grid max-w-4xl gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
            <ScrollReveal variant="clip">
              <MediaSlotImage
                slotId="philosophy-person-01"
                sizes="(max-width: 768px) 100vw, 20rem"
              />
            </ScrollReveal>
            <ScrollReveal delay={150} className="space-y-5">
              {brandStory.paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-loose text-ink-muted">
                  {p}
                </p>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="border-t border-line-soft bg-ivory">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-8 md:grid-cols-2">
            {[mvv.mission, mvv.vision].map((item, i) => (
              <ScrollReveal
                key={item.label}
                delay={i * 150}
                className="border border-line-soft bg-paper p-8 md:p-12"
              >
                <p className="font-en text-xs font-bold tracking-[0.26em] text-bordeaux">
                  {item.label.toUpperCase()}
                </p>
                <p className="mt-6 font-serif-jp text-xl font-semibold leading-relaxed tracking-wide text-ink md:text-2xl">
                  {item.text}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 点 → 線 → 面 → 循環（詳細） */}
      <section className="border-t border-line-soft bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <ScrollReveal>
            <p className="font-en text-xs font-bold tracking-[0.26em] text-bordeaux">
              STORY
            </p>
            <h2 className="mt-4 font-serif-jp text-2xl font-semibold leading-relaxed tracking-wide text-ink md:text-3xl">
              点は線になり、面になり、
              <br />
              やがて循環していく。
            </h2>
          </ScrollReveal>

          <ol className="mt-14 space-y-0">
            {philosophySteps.map((step, i) => (
              <ScrollReveal
                key={step.id}
                as="li"
                className="relative grid gap-4 border-l-2 border-line-soft py-8 pl-8 md:grid-cols-[8rem_1fr] md:gap-10 md:py-10 md:pl-14"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-10 h-3 w-3 rounded-full bg-bordeaux md:top-12"
                />
                <div>
                  <p className="font-en text-xs font-bold tracking-[0.24em] text-ink-muted">
                    {String(i + 1).padStart(2, "0")} — {step.labelEn}
                  </p>
                  <p className="mt-2 font-serif-jp text-3xl font-semibold text-bordeaux">
                    {step.label}
                  </p>
                </div>
                <div>
                  <p className="text-base font-bold text-ink">{step.text}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-loose text-ink-muted">
                    {step.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </ol>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <ScrollReveal variant="clip">
              <MediaSlotImage
                slotId="philosophy-person-02"
                sizes="(max-width: 768px) 100vw, 34rem"
              />
            </ScrollReveal>
            <ScrollReveal delay={150} className="flex items-center">
              <p className="font-serif-jp text-lg font-semibold leading-loose tracking-wide text-ink md:text-xl">
                Arteriaは、その積み重ねを価値に変え、
                <br className="hidden md:block" />
                キャリアにつながる機会へ届ける会社です。
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
