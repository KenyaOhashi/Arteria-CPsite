import Link from "next/link";
import { MediaSlotImage } from "@/components/ui/MediaSlotImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { engagementPaths, recruitPartnerIntro } from "@/content/recruit";

/** 採用・提携の導線セクション。採用（recruit）と提携（partner）のCTAを分けて示す */
export function RecruitPartnerSection() {
  return (
    <section className="border-t border-line-soft bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <SectionHeading
            en={recruitPartnerIntro.en}
            heading={["学びと仕事と機会が", "めぐる仕組みを、", "ともにつくる。"]}
          />
          <ScrollReveal variant="clip" delay={150}>
            <MediaSlotImage
              slotId="recruit-team-01"
              sizes="(max-width: 768px) 100vw, 40rem"
            />
          </ScrollReveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {engagementPaths.map((path, i) => (
            <ScrollReveal key={path.id} as="li" delay={i * 100}>
              <Link
                href={path.href}
                className={`group flex h-full flex-col p-6 transition-all duration-300 md:p-7 ${
                  path.kind === "recruit"
                    ? "bg-bordeaux text-paper hover:bg-bordeaux-dark"
                    : "border border-line-soft bg-paper text-ink hover:border-bordeaux"
                }`}
              >
                <span
                  className={`font-en text-[0.62rem] font-bold tracking-[0.22em] ${
                    path.kind === "recruit"
                      ? "text-blush"
                      : "text-bordeaux"
                  }`}
                >
                  {path.kind === "recruit" ? "RECRUIT" : "PARTNER"}
                </span>
                <span className="mt-3 text-base font-bold leading-snug">
                  {path.title}
                </span>
                <span
                  className={`mt-3 text-xs leading-relaxed ${
                    path.kind === "recruit" ? "text-paper/80" : "text-ink-muted"
                  }`}
                >
                  {path.description}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-auto pt-5 font-en transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
