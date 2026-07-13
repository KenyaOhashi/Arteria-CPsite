import type { Business } from "@/types/content";

export const businessesIntro = {
  heading: "人と企業と教育をつなぐ、3つの事業。",
  en: "BUSINESS",
};

export const businesses: Business[] = [
  {
    id: "recruitment",
    no: "01",
    name: "人材紹介事業",
    nameEn: "RECRUITMENT",
    summary:
      "求職者の経験や志向を整理し、企業が求める人材との適切な接点をつくります。",
    description:
      "経歴を右から左へ流す紹介ではなく、一人ひとりが積み重ねてきた経験を整理し、言葉にするところから始めます。企業側の要件も表面的な条件ではなく、組織や仕事の実態まで踏み込んで理解したうえで、双方にとって意味のある接点をつくります。",
    points: [
      "経験・志向の棚卸しとキャリアの言語化支援",
      "企業の採用要件の整理と人材要件の設計",
      "入社後の活躍を見据えたマッチング",
      "外部キャリアアドバイザーとの連携による多様な視点",
    ],
    mediaSlotId: "business-recruitment-01",
    href: "/business#recruitment",
  },
  {
    id: "education",
    no: "02",
    name: "教育・キャリア開発事業",
    nameEn: "EDUCATION & CAREER",
    summary:
      "職種研修、スキル研修、動画研修、実践型コンテンツを通じて、学びを仕事につながるスキルへ変えます。",
    description:
      "学ぶこと自体を目的にせず、「仕事につながる学び」を設計します。職種別の研修から、実務を想定した実践型コンテンツまで、学んだことがそのままキャリアの価値になる教育プログラムを提供します。",
    points: [
      "職種研修・スキル研修の企画・提供",
      "動画研修・オンラインコンテンツの制作",
      "実践型・伴走型のキャリア開発プログラム",
      "学習履歴をキャリアにつなげる仕組みづくり",
    ],
    mediaSlotId: "business-education-01",
    href: "/business#education",
  },
  {
    id: "partner",
    no: "03",
    name: "パートナー連携",
    nameEn: "PARTNERSHIP",
    summary:
      "人材会社、教育会社、企業、外部キャリアアドバイザーとの連携を通じて、多様なキャリア機会を生み出します。",
    description:
      "1社で完結させず、人材・教育領域のプレイヤーと積極的に連携します。それぞれの強みを持ち寄ることで、一人ひとりに届けられる機会の幅を広げ、業界全体としての循環をつくります。",
    points: [
      "人材会社・教育会社とのアライアンス",
      "企業の採用・育成課題への共同提案",
      "外部キャリアアドバイザーの参画スキーム",
      "新規事業・プロジェクトの共同企画",
    ],
    mediaSlotId: "business-partner-01",
    href: "/business#partner",
  },
];
