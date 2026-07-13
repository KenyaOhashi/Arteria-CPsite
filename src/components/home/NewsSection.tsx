import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LinkButton } from "@/components/ui/LinkButton";
import { NewsList } from "@/components/news/NewsList";
import { getLatestNews } from "@/content/news";

/** トップページのお知らせセクション */
export function NewsSection() {
  const items = getLatestNews(3);
  return (
    <section className="border-t border-line-soft bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_3fr]">
          <SectionHeading en="NEWS" heading="お知らせ" />
          <div>
            <ScrollReveal delay={100}>
              <NewsList items={items} />
            </ScrollReveal>
            <ScrollReveal delay={200} className="mt-8 text-right">
              <LinkButton href="/news" variant="ghost">
                一覧を見る
              </LinkButton>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
