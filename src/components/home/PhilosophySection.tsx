import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextLink } from "@/components/ui/LinkButton";
import { brandStory, philosophySteps } from "@/content/philosophy";

/** 点・線・面・循環のアイコン */
function StepIcon({ id }: { id: string }) {
  const common = {
    stroke: "var(--color-bordeaux)",
    strokeWidth: 1.5,
    fill: "none",
  } as const;
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-14 w-14 md:h-16 md:w-16"
      aria-hidden="true"
    >
      {id === "dot" && (
        <g fill="var(--color-bordeaux)">
          <circle cx="18" cy="24" r="3.5" />
          <circle cx="40" cy="16" r="2.5" opacity="0.55" />
          <circle cx="48" cy="38" r="3" opacity="0.75" />
          <circle cx="26" cy="46" r="2.5" opacity="0.45" />
          <circle cx="36" cy="32" r="2" opacity="0.6" />
        </g>
      )}
      {id === "line" && (
        <g>
          <path d="M10 48 L26 30 L38 38 L54 14" {...common} />
          <g fill="var(--color-bordeaux)">
            <circle cx="10" cy="48" r="3" />
            <circle cx="26" cy="30" r="3" />
            <circle cx="38" cy="38" r="3" />
            <circle cx="54" cy="14" r="3" />
          </g>
        </g>
      )}
      {id === "plane" && (
        <g stroke="var(--color-bordeaux)" strokeWidth="1.3" fill="none">
          {[16, 32, 48].map((x) =>
            [18, 32, 46].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" opacity="0.8" />
            )),
          )}
        </g>
      )}
      {id === "circulation" && (
        <g>
          <path
            d="M32 10 A22 22 0 1 1 12.4 22"
            {...common}
            strokeWidth={1.8}
          />
          <path
            d="M12.4 22 L8 14 M12.4 22 L21 20"
            stroke="var(--color-bordeaux)"
            strokeWidth="1.8"
            fill="none"
          />
        </g>
      )}
    </svg>
  );
}

/** トップページの Philosophy セクション（点→線→面→循環の図解） */
export function PhilosophySection() {
  return (
    <section
      className="border-t border-line-soft bg-paper"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              en="PHILOSOPHY"
              heading={[
                "一人ひとりが積み重ねてきた",
                "時間を、次の機会へつなげる。",
              ]}
            />
            <ScrollReveal delay={150} className="mt-8 space-y-5">
              {brandStory.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-sm leading-loose text-ink-muted md:text-[0.9rem]"
                >
                  {p}
                </p>
              ))}
            </ScrollReveal>
            <ScrollReveal delay={250} className="mt-8">
              <TextLink href="/philosophy">理念について詳しく</TextLink>
            </ScrollReveal>
          </div>

          {/* 点 → 線 → 面 → 循環 */}
          <ol className="grid grid-cols-2 content-center gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-2 lg:grid-cols-2 lg:gap-y-14 xl:grid-cols-4">
            {philosophySteps.map((step, i) => (
              <ScrollReveal
                key={step.id}
                as="li"
                delay={i * 180}
                className="relative flex flex-col items-center text-center"
              >
                {i < philosophySteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 top-8 hidden font-en text-ink-muted md:block lg:hidden xl:block"
                  >
                    →
                  </span>
                )}
                <StepIcon id={step.id} />
                <span className="mt-4 font-serif-jp text-2xl font-semibold text-bordeaux">
                  {step.label}
                </span>
                <span className="mt-1 font-en text-[0.6rem] font-bold tracking-[0.24em] text-ink-muted">
                  {step.labelEn}
                </span>
                <p className="mt-3 max-w-40 text-xs leading-relaxed text-ink-muted">
                  {step.text}
                </p>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
