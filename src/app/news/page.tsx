import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { NewsList } from "@/components/news/NewsList";
import { CTASection } from "@/components/ui/CTASection";
import { newsItems } from "@/content/news";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "株式会社Arteriaからのお知らせ・プレスリリース一覧です。",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const items = [...newsItems].sort((a, b) => (a.date < b.date ? 1 : -1));
  const hasSample = items.some((item) => item.isSample);

  return (
    <>
      <PageHeader
        en="NEWS"
        title="お知らせ"
        lead="Arteriaからのお知らせやプレスリリースをお届けします。"
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
          <ScrollReveal>
            <NewsList items={items} />
            {hasSample && (
              <p className="mt-6 text-xs leading-relaxed text-ink-muted">
                ※現在表示されている記事はレイアウト確認用のサンプルです。公開前に実際の記事へ差し替えます。
              </p>
            )}
          </ScrollReveal>
        </div>
      </section>
      <CTASection />
    </>
  );
}
