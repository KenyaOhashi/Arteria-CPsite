import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { features, featuresIntro } from "@/content/features";

/** Arteriaの特徴。タイポグラフィ中心、数字はManropeで大きく */
export function FeaturesSection() {
  return (
    <section className="border-t border-line-soft bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <SectionHeading en={featuresIntro.en} heading={featuresIntro.heading} />

        <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <ScrollReveal
              key={feature.no}
              as="li"
              delay={i * 120}
              className="group border-t-2 border-line-soft pt-6 transition-colors duration-500 hover:border-bordeaux"
            >
              <p
                aria-hidden="true"
                className="font-en text-5xl font-extrabold leading-none text-bordeaux transition-transform duration-500 group-hover:-translate-y-1 md:text-6xl"
              >
                {feature.no}
              </p>
              <h3 className="mt-5 text-base font-bold leading-relaxed text-ink md:text-[1.05rem]">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-loose text-ink-muted opacity-80 transition-opacity duration-500 group-hover:opacity-100">
                {feature.description}
              </p>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
