import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MediaSlotImage } from "@/components/ui/MediaSlotImage";
import { CompanyTable } from "@/components/company/CompanyTable";
import { CTASection } from "@/components/ui/CTASection";
import { companyFacts, representativeMessage } from "@/content/company";

export const metadata: Metadata = {
  title: "会社情報",
  description:
    "株式会社Arteriaの会社情報。会社概要、役員、事業内容をご紹介します。",
  alternates: { canonical: "/company" },
};

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        en="COMPANY"
        title="会社情報"
        lead="学びと仕事と機会をめぐらせる、社会の動脈になる。その実現に向けて、Arteriaは歩みを始めます。"
      />

      {/* 代表メッセージ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <ScrollReveal variant="clip">
              <MediaSlotImage
                slotId="representative-01"
                sizes="(max-width: 768px) 100vw, 24rem"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <p className="font-en text-xs font-bold tracking-[0.26em] text-bordeaux">
                  MESSAGE
                </p>
                <h2 className="mt-4 font-serif-jp text-2xl font-semibold leading-relaxed tracking-wide text-ink md:text-3xl">
                  {representativeMessage.title}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150} className="mt-8 space-y-5">
                {representativeMessage.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-loose text-ink-muted">
                    {p}
                  </p>
                ))}
              </ScrollReveal>
              <ScrollReveal delay={250} className="mt-8">
                <p className="text-xs text-ink-muted">
                  {representativeMessage.role}
                </p>
                <p className="mt-1 font-serif-jp text-xl font-semibold tracking-widest text-ink">
                  {representativeMessage.name}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 会社概要 */}
      <section className="border-t border-line-soft bg-ivory">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 md:grid-cols-[1fr_3fr]">
            <ScrollReveal>
              <p className="font-en text-xs font-bold tracking-[0.26em] text-bordeaux">
                PROFILE
              </p>
              <h2 className="mt-4 font-serif-jp text-2xl font-semibold tracking-wide text-ink md:text-3xl">
                会社概要
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <CompanyTable facts={companyFacts} />
              <p className="mt-6 text-xs leading-relaxed text-ink-muted">
                ※「確定前の仮情報」と表示されている項目は、公開前に確定情報へ差し替えます。
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
