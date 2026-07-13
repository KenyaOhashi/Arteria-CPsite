"use client";

import { useEffect, useRef, useState } from "react";
import { MediaSlotImage } from "@/components/ui/MediaSlotImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextLink } from "@/components/ui/LinkButton";
import { businesses, businessesIntro } from "@/content/businesses";

/**
 * 事業紹介セクション。
 * PC: 左側がSticky（現在の事業番号とナビ）、右側の事業ブロックのスクロールに連動して切り替わる。
 * SP: 縦に自然に読める構成。
 */
export function BusinessSection() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = blockRefs.current.indexOf(
              entry.target as HTMLElement,
            );
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-t border-line-soft bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <SectionHeading en="BUSINESS" heading={businessesIntro.heading} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-20">
          {/* 左：Stickyナビ（PCのみ） */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <p
                aria-hidden="true"
                className="font-en text-[7rem] font-extrabold leading-none text-bordeaux transition-all duration-500"
              >
                {businesses[active].no}
              </p>
              <ul className="mt-8 space-y-1 border-l border-line-soft">
                {businesses.map((b, i) => (
                  <li key={b.id}>
                    <a
                      href={`#business-item-${b.id}`}
                      className={`-ml-px flex items-baseline gap-4 border-l-2 py-3 pl-6 transition-all duration-300 ${
                        active === i
                          ? "border-bordeaux text-ink"
                          : "border-transparent text-ink-muted hover:text-ink"
                      }`}
                      aria-current={active === i ? "true" : undefined}
                    >
                      <span className="font-en text-xs font-bold">{b.no}</span>
                      <span className="text-sm font-medium">{b.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 右：事業ブロック */}
          <div className="space-y-20 lg:space-y-32">
            {businesses.map((b, i) => (
              <article
                key={b.id}
                id={`business-item-${b.id}`}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                className="scroll-mt-32"
              >
                <ScrollReveal>
                  <p className="flex items-baseline gap-4 lg:hidden">
                    <span
                      aria-hidden="true"
                      className="font-en text-5xl font-extrabold text-bordeaux"
                    >
                      {b.no}
                    </span>
                    <span className="font-en text-[0.65rem] font-bold tracking-[0.22em] text-ink-muted">
                      {b.nameEn}
                    </span>
                  </p>
                  <div className="mt-4 grid gap-8 md:grid-cols-[1fr_1fr] md:items-center lg:mt-0">
                    <div>
                      <p className="hidden font-en text-[0.65rem] font-bold tracking-[0.22em] text-ink-muted lg:block">
                        {b.nameEn}
                      </p>
                      <h3 className="mt-2 font-serif-jp text-2xl font-semibold tracking-wide text-ink md:text-[1.7rem]">
                        {b.name}
                      </h3>
                      <p className="mt-5 text-sm leading-loose text-ink-muted">
                        {b.summary}
                      </p>
                      <div className="mt-6">
                        <TextLink href={b.href}>詳細を見る</TextLink>
                      </div>
                    </div>
                    <ScrollReveal variant="clip" delay={150}>
                      <MediaSlotImage
                        slotId={b.mediaSlotId}
                        sizes="(max-width: 768px) 100vw, 34rem"
                      />
                    </ScrollReveal>
                  </div>
                </ScrollReveal>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
