import Link from "next/link";
import type { NewsItem } from "@/types/content";
import { formatNewsDate } from "@/content/news";

/** ニュース記事のリスト（トップページ・一覧ページ共通） */
export function NewsList({ items }: { items: NewsItem[] }) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-sm text-ink-muted">
        現在、公開中のお知らせはありません。
      </p>
    );
  }
  return (
    <ul className="divide-y divide-line-soft border-y border-line-soft">
      {items.map((item) => {
        const href = item.href ?? `/news#${item.slug}`;
        return (
          <li key={item.slug} id={item.slug}>
            <Link
              href={href}
              className="group flex flex-col gap-2 py-5 transition-colors hover:bg-paper sm:flex-row sm:items-center sm:gap-6 sm:px-2"
            >
              <time
                dateTime={item.date}
                className="font-en text-sm tracking-wider text-ink-muted"
              >
                {formatNewsDate(item.date)}
              </time>
              <span className="inline-flex w-fit items-center border border-bordeaux/40 px-3 py-0.5 text-[0.68rem] tracking-wider text-bordeaux">
                {item.category}
              </span>
              <span className="text-sm font-medium leading-relaxed text-ink transition-colors group-hover:text-bordeaux">
                {item.title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
