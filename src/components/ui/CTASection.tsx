import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { corePhilosophy } from "@/content/philosophy";

/** ページ下部の共通CTA（お問い合わせ導線） */
export function CTASection() {
  return (
    <section className="bg-bordeaux text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <ScrollReveal>
            <p className="font-en text-xs font-bold tracking-[0.22em] text-blush">
              CONTACT
            </p>
            <p className="mt-4 font-serif-jp text-xl font-semibold leading-relaxed tracking-wide md:text-3xl">
              {corePhilosophy.main}
              <br />
              {corePhilosophy.sub}
            </p>
            <p className="mt-4 text-sm text-paper/80">
              人材紹介、教育・研修、業務提携、採用について、お気軽にご相談ください。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150} className="shrink-0">
            <Link
              href="/contact"
              className="group inline-flex min-h-14 items-center gap-3 border border-paper/70 px-10 py-4 text-sm font-medium tracking-wider transition-colors duration-300 hover:bg-paper hover:text-bordeaux"
            >
              お問い合わせ
              <span
                aria-hidden="true"
                className="font-en transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
