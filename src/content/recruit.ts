import type { EngagementPath } from "@/types/content";

export const recruitPartnerIntro = {
  heading: "学びと仕事と機会がめぐる仕組みを、ともにつくる。",
  en: "RECRUIT / PARTNER",
};

/** 採用・提携の4つの導線 */
export const engagementPaths: EngagementPath[] = [
  {
    id: "join",
    kind: "recruit",
    title: "Arteriaで働く",
    description:
      "新しい循環を生み出す仲間を募集しています。立ち上げ期だからこそ、事業づくりの中心に関われます。",
    href: "/recruit",
  },
  {
    id: "advisor",
    kind: "recruit",
    title: "外部キャリアアドバイザーとして参画する",
    description:
      "あなたの経験を、より多くの人の背中を押す力に。複業・パラレルワークでの参画を歓迎します。",
    href: "/recruit#advisor",
  },
  {
    id: "education-partner",
    kind: "partner",
    title: "教育・研修で連携する",
    description:
      "学びを仕事につなげる研修・コンテンツを、ともに企画・提供するパートナーを探しています。",
    href: "/recruit#partner",
  },
  {
    id: "recruitment-partner",
    kind: "partner",
    title: "人材紹介で連携する",
    description:
      "企業の採用課題に、両面から向き合いましょう。人材会社・企業との連携を歓迎します。",
    href: "/recruit#partner",
  },
];
