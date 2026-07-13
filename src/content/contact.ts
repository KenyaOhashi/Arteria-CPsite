/** お問い合わせ種別 */
export const contactCategories = [
  "人材紹介について",
  "教育・研修について",
  "業務提携について",
  "採用について",
  "その他",
] as const;

export type ContactCategory = (typeof contactCategories)[number];

/** フォームの入力値 */
export type ContactFormValues = {
  company: string;
  name: string;
  email: string;
  tel: string;
  category: ContactCategory | "";
  message: string;
  agreed: boolean;
};
