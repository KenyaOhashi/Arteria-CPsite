import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "株式会社Arteriaへのお問い合わせ。人材紹介、教育・研修、業務提携、採用について、お気軽にご相談ください。",
  alternates: { canonical: "/contact" },
};

/** URLクエリ（?type=）からお問い合わせ種別の初期値を決める */
const categoryByType: Record<string, string> = {
  recruitment: "人材紹介について",
  education: "教育・研修について",
  partnership: "業務提携について",
  recruit: "採用について",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const defaultCategory = type ? (categoryByType[type] ?? "") : "";

  return (
    <>
      <PageHeader
        en="CONTACT"
        title="お問い合わせ"
        lead="人材紹介、教育・研修、業務提携、採用について、お気軽にご相談ください。内容を確認のうえ、担当者よりご連絡いたします。"
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <ScrollReveal>
            <ContactForm defaultCategory={defaultCategory} />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
