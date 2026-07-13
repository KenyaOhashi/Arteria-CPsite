import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "株式会社Arteriaのプライバシーポリシー（個人情報保護方針）です。",
  alternates: { canonical: "/privacy" },
};

/**
 * プライバシーポリシー（初期版のドラフト）。
 * ⚠️ 公開前に法務・専門家の確認を取り、所在地・連絡先・許可番号の確定情報を反映すること。
 */
const sections: { title: string; body: string[] }[] = [
  {
    title: "1. 基本方針",
    body: [
      "株式会社Arteria（以下「当社」といいます）は、人材紹介事業および教育・キャリア開発事業を通じてお預かりする個人情報の重要性を認識し、個人情報の保護に関する法律（個人情報保護法）その他の関係法令を遵守するとともに、個人情報を適切に取り扱います。",
    ],
  },
  {
    title: "2. 取得する情報と取得方法",
    body: [
      "当社は、お問い合わせフォームへの入力、サービスへのお申し込み、その他の適法かつ公正な手段により、氏名、会社名、メールアドレス、電話番号、職務経歴その他の個人情報を取得します。",
    ],
  },
  {
    title: "3. 利用目的",
    body: [
      "当社は、取得した個人情報を次の目的の範囲内で利用します。",
      "・お問い合わせへの対応および連絡のため",
      "・人材紹介サービスの提供（求人企業への紹介を含む）のため",
      "・教育・研修サービスの提供および運営のため",
      "・サービスの改善、新サービスの開発のため",
      "・法令に基づく対応のため",
    ],
  },
  {
    title: "4. 第三者提供",
    body: [
      "当社は、法令に定める場合またはご本人の同意がある場合を除き、個人情報を第三者に提供しません。人材紹介サービスにおいて求人企業へ個人情報を提供する場合は、事前にご本人の同意を得たうえで行います。",
    ],
  },
  {
    title: "5. 安全管理",
    body: [
      "当社は、個人情報への不正アクセス、紛失、破壊、改ざん、漏えい等を防止するため、必要かつ適切な安全管理措置を講じます。",
    ],
  },
  {
    title: "6. 開示・訂正・利用停止等",
    body: [
      "ご本人から個人情報の開示、訂正、追加、削除、利用停止等のご請求があった場合は、ご本人であることを確認のうえ、法令に従い速やかに対応します。",
    ],
  },
  {
    title: "7. お問い合わせ窓口",
    body: [
      "個人情報の取り扱いに関するお問い合わせは、お問い合わせフォームよりご連絡ください。",
    ],
  },
  {
    title: "8. 改定",
    body: [
      "本ポリシーの内容は、法令の改正やサービス内容の変更に応じて、予告なく改定することがあります。改定後の内容は本ページに掲載した時点から適用されます。",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader en="PRIVACY POLICY" title="プライバシーポリシー" />
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <ScrollReveal className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="border-l-2 border-bordeaux pl-4 text-base font-bold text-ink">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-2">
                  {section.body.map((p, i) => (
                    <p
                      key={i}
                      className="text-sm leading-loose text-ink-muted"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
            <div className="border-t border-line-soft pt-8 text-sm text-ink-muted">
              <p>制定日：2026年8月3日</p>
              <p className="mt-1">株式会社Arteria</p>
              <p className="mt-6 text-xs">
                ※本ポリシーは初期版のドラフトです。公開前に専門家の確認と、連絡先等の確定情報の反映を行ってください。
              </p>
              <p className="mt-6">
                <Link
                  href="/contact"
                  className="text-bordeaux underline underline-offset-4 hover:opacity-80"
                >
                  お問い合わせフォームはこちら
                </Link>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
