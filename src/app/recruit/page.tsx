import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MediaSlotImage } from "@/components/ui/MediaSlotImage";
import { LinkButton } from "@/components/ui/LinkButton";
import { CTASection } from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: "採用情報・パートナー",
  description:
    "株式会社Arteriaの採用情報とパートナー募集。Arteriaで働く仲間、外部キャリアアドバイザー、教育・人材紹介の提携パートナーを募集しています。",
  alternates: { canonical: "/recruit" },
};

export default function RecruitPage() {
  return (
    <>
      <PageHeader
        en="RECRUIT / PARTNER"
        title="採用・パートナー"
        lead="学びと仕事と機会がめぐる仕組みを、ともにつくる仲間とパートナーを探しています。"
      />

      {/* Arteriaで働く */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <ScrollReveal>
                <p className="font-en text-xs font-bold tracking-[0.26em] text-bordeaux">
                  JOIN US
                </p>
                <h2 className="mt-4 font-serif-jp text-2xl font-semibold leading-relaxed tracking-wide text-ink md:text-3xl">
                  Arteriaで働く
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150} className="mt-6 space-y-5">
                <p className="text-sm leading-loose text-ink-muted">
                  Arteriaは2026年に生まれたばかりの会社です。決まりきった仕事をこなすのではなく、学びと仕事と機会がめぐる仕組みそのものを、一緒につくっていくフェーズにあります。
                </p>
                <p className="text-sm leading-loose text-ink-muted">
                  人のキャリアに本気で向き合いたい人、教育を仕事につなげたい人、立ち上げ期の熱量を面白がれる人。経歴よりも、これまで積み重ねてきた時間と、これからの意志を大切にします。
                </p>
              </ScrollReveal>
              <ScrollReveal delay={250} className="mt-8">
                <LinkButton href="/contact?type=recruit">
                  採用について問い合わせる
                </LinkButton>
              </ScrollReveal>
              <ScrollReveal delay={300} className="mt-4">
                <p className="text-xs text-ink-muted">
                  ※募集職種の詳細は準備中です。まずはお気軽にご連絡ください。
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal variant="clip" delay={150}>
              <MediaSlotImage
                slotId="recruit-person-01"
                sizes="(max-width: 768px) 100vw, 26rem"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 外部キャリアアドバイザー */}
      <section id="advisor" className="scroll-mt-24 border-t border-line-soft bg-ivory">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <ScrollReveal variant="clip" className="lg:order-1">
              <MediaSlotImage
                slotId="recruit-team-01"
                sizes="(max-width: 768px) 100vw, 32rem"
              />
            </ScrollReveal>
            <div className="lg:order-2">
              <ScrollReveal>
                <p className="font-en text-xs font-bold tracking-[0.26em] text-bordeaux">
                  CAREER ADVISOR
                </p>
                <h2 className="mt-4 font-serif-jp text-2xl font-semibold leading-relaxed tracking-wide text-ink md:text-3xl">
                  外部キャリアアドバイザーとして参画する
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150} className="mt-6 space-y-5">
                <p className="text-sm leading-loose text-ink-muted">
                  人材業界での経験、採用や育成の知見、特定領域のキャリアに関する専門性。あなたが積み重ねてきた経験を、より多くの人の背中を押す力に変えませんか。
                </p>
                <p className="text-sm leading-loose text-ink-muted">
                  複業・パラレルワークでの参画を歓迎しています。稼働時間や関わり方は、ご相談のうえ柔軟に設計します。
                </p>
              </ScrollReveal>
              <ScrollReveal delay={250} className="mt-8">
                <LinkButton href="/contact?type=recruit" variant="ghost">
                  参画について相談する
                </LinkButton>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* パートナー連携 */}
      <section id="partner" className="scroll-mt-24 border-t border-line-soft bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <ScrollReveal>
            <p className="font-en text-xs font-bold tracking-[0.26em] text-bordeaux">
              PARTNERSHIP
            </p>
            <h2 className="mt-4 font-serif-jp text-2xl font-semibold leading-relaxed tracking-wide text-ink md:text-3xl">
              企業・パートナーの皆さまへ
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-loose text-ink-muted">
              Arteriaは、人材・教育領域のプレイヤーとの連携を積極的に進めています。1社で完結させず、それぞれの強みを持ち寄ることで、届けられる機会の幅を広げていきます。
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <ScrollReveal className="border border-line-soft bg-ivory p-8 md:p-10">
              <h3 className="font-serif-jp text-xl font-semibold text-ink">
                教育・研修で連携する
              </h3>
              <p className="mt-4 text-sm leading-loose text-ink-muted">
                職種研修やスキル研修、動画コンテンツの共同開発など、「学びを仕事につなげる」教育プログラムをともにつくるパートナーを探しています。教育会社、研修講師、コンテンツホルダーの方はぜひご相談ください。
              </p>
              <div className="mt-6">
                <LinkButton href="/contact?type=education" variant="ghost">
                  教育・研修について相談する
                </LinkButton>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150} className="border border-line-soft bg-ivory p-8 md:p-10">
              <h3 className="font-serif-jp text-xl font-semibold text-ink">
                人材紹介で連携する
              </h3>
              <p className="mt-4 text-sm leading-loose text-ink-muted">
                採用に課題を持つ企業さま、求職者への機会を広げたい人材会社さまとの連携を歓迎します。企業と人の双方にとって意味のある接点を、一緒につくりましょう。
              </p>
              <div className="mt-6">
                <LinkButton href="/contact?type=partnership" variant="ghost">
                  業務提携について相談する
                </LinkButton>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="clip" delay={200} className="mt-12">
            <MediaSlotImage
              slotId="partner-meeting-01"
              sizes="(max-width: 768px) 100vw, 56rem"
              className="mx-auto max-w-3xl"
            />
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
