import type { NewsItem } from "@/types/content";

/**
 * ニュース記事データ。
 *
 * ⚠️ 以下の3件はレイアウト確認用の【サンプル記事】です（isSample: true）。
 * 事実として公開しないこと。公開前に実際の記事へ差し替えるか削除する。
 *
 * 将来CMS（microCMS / Contentful / Newt など）へ移行する場合は、
 * この配列を返す関数を fetch 実装に置き換えるだけで移行できる。
 */
export const newsItems: NewsItem[] = [
  {
    slug: "sample-site-launch",
    date: "2026-08-03",
    category: "お知らせ",
    title: "コーポレートサイトを公開しました（サンプル記事）",
    summary:
      "これはレイアウト確認用のサンプル記事です。公開前に実際の記事へ差し替えてください。",
    isSample: true,
  },
  {
    slug: "sample-company-founded",
    date: "2026-08-03",
    category: "プレスリリース",
    title: "株式会社Arteriaを設立しました（サンプル記事）",
    summary:
      "これはレイアウト確認用のサンプル記事です。公開前に実際の記事へ差し替えてください。",
    isSample: true,
  },
  {
    slug: "sample-service-preparation",
    date: "2026-08-10",
    category: "お知らせ",
    title: "人材紹介・教育研修サービスの提供準備を開始しました（サンプル記事）",
    summary:
      "これはレイアウト確認用のサンプル記事です。公開前に実際の記事へ差し替えてください。",
    isSample: true,
  },
];

/** 日付の表示用フォーマット（YYYY.MM.DD） */
export function formatNewsDate(iso: string): string {
  return iso.replaceAll("-", ".");
}

export function getLatestNews(count: number): NewsItem[] {
  return [...newsItems]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, count);
}
