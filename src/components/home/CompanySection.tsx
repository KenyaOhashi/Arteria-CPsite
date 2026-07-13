import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LinkButton } from "@/components/ui/LinkButton";
import { CompanyTable } from "@/components/company/CompanyTable";
import { companyFacts } from "@/content/company";

/** トップページの会社情報セクション（主要項目のみ） */
export function CompanySection() {
  const keyLabels = ["会社名", "英語表記", "設立", "代表取締役", "資本金", "事業内容"];
  const facts = companyFacts.filter((f) => keyLabels.includes(f.label));
  return (
    <section className="border-t border-line-soft bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_3fr]">
          <SectionHeading en="COMPANY" heading="会社情報" />
          <div>
            <ScrollReveal delay={100}>
              <CompanyTable facts={facts} />
            </ScrollReveal>
            <ScrollReveal delay={200} className="mt-8 text-right">
              <LinkButton href="/company" variant="ghost">
                会社情報を見る
              </LinkButton>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
