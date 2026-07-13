import type { CompanyFact } from "@/types/content";

/**
 * 会社情報。
 * confirmed: false の項目は仮データ。公開前に必ず確定させること。
 */
export const companyFacts: CompanyFact[] = [
  { label: "会社名", value: "株式会社Arteria", confirmed: true },
  { label: "英語表記", value: "Arteria Co., Ltd.", confirmed: true },
  { label: "設立", value: "2026年8月3日", confirmed: true },
  { label: "代表取締役", value: "大橋 賢也", confirmed: true },
  { label: "取締役", value: "千代 直季", confirmed: true },
  { label: "資本金", value: "1,500万円", confirmed: true },
  { label: "決算月", value: "12月", confirmed: true },
  {
    label: "事業内容",
    value:
      "有料職業紹介事業／教育・キャリア開発事業／人材・教育領域におけるパートナー連携／新規事業およびプロジェクトの企画・推進",
    confirmed: true,
  },
  {
    label: "所在地",
    value: "〒000-0000 東京都（所在地確定後に差し替え）",
    confirmed: false,
    note: "所在地は未確定。確定後にこの値を差し替える",
  },
  {
    label: "有料職業紹介事業許可番号",
    value: "13-ユ-000000（許可取得後に差し替え）",
    confirmed: false,
    note: "許可番号は未取得・未確定。取得後にこの値を差し替える",
  },
  {
    label: "連絡先",
    value: "info@example.com（連絡先確定後に差し替え）",
    confirmed: false,
    note: "メールアドレス・電話番号は未確定",
  },
];

export const businessLines = [
  "有料職業紹介事業",
  "教育・キャリア開発事業",
  "人材・教育領域におけるパートナー連携",
  "新規事業およびプロジェクトの企画・推進",
] as const;

/** 代表メッセージ（初期版の仮文面。公開前に代表確認を取ること） */
export const representativeMessage = {
  title: "積み重ねてきた時間を、次の機会へ。",
  name: "大橋 賢也",
  role: "代表取締役",
  mediaSlotId: "representative-01",
  paragraphs: [
    "人生とは、時間の積み重ねです。学び、経験し、失敗し、出会い、人は少しずつ変わっていきます。その一つひとつは、最初から意味のある形をしているとは限りません。",
    "しかし、点のように散らばった学びや経験は、いつか線になり、面になり、その人の人生を形づくっていきます。私たちは、その積み重ねを価値に変え、キャリアにつながる機会へ届けたいと考えています。",
    "学びが仕事につながり、仕事が新たな経験を生み、その経験が次の機会へめぐっていく。人と企業と教育の間に循環をつくること。それが、Arteriaという社名に込めた「社会の動脈になる」という決意です。",
  ],
};
