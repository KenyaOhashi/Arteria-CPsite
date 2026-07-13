import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MediaSlotImage } from "@/components/ui/MediaSlotImage";
import { LinkButton } from "@/components/ui/LinkButton";
import { CTASection } from "@/components/ui/CTASection";
import { businesses } from "@/content/businesses";

export const metadata: Metadata = {
  title: "事業内容",
  description:
    "株式会社Arteriaの事業内容。人材紹介事業、教育・キャリア開発事業、パートナー連携を通じて、学びと仕事と機会の循環をつくります。",
  alternates: { canonical: "/business" },
};

export default function BusinessPage() {
  return (
    <>
      <PageHeader
        en="BUSINESS"
        title="事業内容"
        lead="人と企業と教育をつなぐ3つの事業を通じて、学びと仕事と機会がめぐる循環をつくります。"
      />

      {businesses.map((b, i) => (
        <section
          key={b.id}
          id={b.id}
          className={`scroll-mt-24 border-t border-line-soft ${
            i % 2 === 0 ? "bg-paper" : "bg-ivory"
          }`}
        >
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
            <div
              className={`grid items-center gap-10 lg:gap-20 ${
                i % 2 === 0
                  ? "lg:grid-cols-[1.15fr_1fr]"
                  : "lg:grid-cols-[1fr_1.15fr]"
              }`}
            >
              <div className={i % 2 === 0 ? "" : "lg:order-2"}>
                <ScrollReveal>
                  <p className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="font-en text-6xl font-extrabold text-bordeaux md:text-7xl"
                    >
                      {b.no}
                    </span>
                    <span className="font-en text-[0.65rem] font-bold tracking-[0.24em] text-ink-muted">
                      {b.nameEn}
                    </span>
                  </p>
                  <h2 className="mt-5 font-serif-jp text-2xl font-semibold tracking-wide text-ink md:text-3xl">
                    {b.name}
                  </h2>
                  <p className="mt-6 text-sm leading-loose text-ink-muted md:text-[0.92rem]">
                    {b.description}
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={150} className="mt-8">
                  <h3 className="text-sm font-bold text-ink">主な取り組み</h3>
                  <ul className="mt-4 space-y-3">
                    {b.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bordeaux"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>

                <ScrollReveal delay={250} className="mt-10">
                  <LinkButton href="/contact" variant="ghost">
                    この事業について問い合わせる
                  </LinkButton>
                </ScrollReveal>
              </div>

              <ScrollReveal
                variant="clip"
                delay={150}
                className={i % 2 === 0 ? "" : "lg:order-1"}
              >
                <MediaSlotImage
                  slotId={b.mediaSlotId}
                  sizes="(max-width: 768px) 100vw, 32rem"
                />
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      <CTASection />
    </>
  );
}
