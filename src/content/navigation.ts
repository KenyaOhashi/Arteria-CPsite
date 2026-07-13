import type { NavItem } from "@/types/content";

/** ヘッダーのグローバルナビゲーション（Contact はボタンとして別扱い） */
export const globalNav: NavItem[] = [
  { label: "理念", labelEn: "Philosophy", href: "/philosophy" },
  { label: "事業内容", labelEn: "Business", href: "/business" },
  { label: "会社情報", labelEn: "Company", href: "/company" },
  { label: "採用情報", labelEn: "Recruit", href: "/recruit" },
  { label: "お知らせ", labelEn: "News", href: "/news" },
  { label: "パートナー", labelEn: "Partner", href: "/recruit#partner" },
];

export const contactNav: NavItem = {
  label: "お問い合わせ",
  labelEn: "Contact",
  href: "/contact",
};

/** フッターのリンク */
export const footerNav: NavItem[] = [
  ...globalNav,
  contactNav,
  { label: "プライバシーポリシー", labelEn: "Privacy Policy", href: "/privacy" },
];
