"use client";

import { useEffect, useRef } from "react";
import { MediaSlotImage } from "@/components/ui/MediaSlotImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LinkButton } from "@/components/ui/LinkButton";
import { corePhilosophy, heroCopy } from "@/content/philosophy";

/**
 * ファーストビュー。
 * 人物写真のコラージュに、細い線と点の装飾、控えめなパララックスを重ねる。
 * prefers-reduced-motion 時はパララックスを無効化する。
 */
export function Hero() {
  const collageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items =
      collageRef.current?.querySelectorAll<HTMLElement>("[data-parallax]");
    if (!items || items.length === 0) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      items.forEach((el) => {
        const speed = Number(el.dataset.parallax ?? 0);
        el.style.transform = `translate3d(0, ${(-y * speed).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-16 md:pt-20">
      {/* 背景の装飾（線と点） */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          d="M-40 620 C 240 560, 420 700, 700 620 S 1180 380, 1480 430"
          stroke="var(--color-blush-deep)"
          strokeWidth="1"
        />
        <path
          d="M640 80 C 800 200, 760 340, 950 400 S 1300 640, 1460 700"
          stroke="var(--color-bordeaux)"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <circle cx="700" cy="620" r="4" fill="var(--color-bordeaux)" fillOpacity="0.35" />
        <circle cx="950" cy="400" r="3" fill="var(--color-bordeaux)" fillOpacity="0.3" />
        <circle cx="240" cy="575" r="3" fill="var(--color-blush-deep)" />
        <circle cx="1300" cy="640" r="4" fill="var(--color-blush-deep)" />
      </svg>

      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-12 px-5 pb-16 pt-10 md:min-h-[calc(100svh-5rem)] md:px-8 md:pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* コピー */}
        <div className="relative z-10">
          <ScrollReveal as="h1" className="font-serif-jp font-semibold tracking-wide">
            <span className="block text-[1.65rem] leading-[1.75] text-ink md:text-[2.2rem] md:leading-[1.7] lg:text-[2rem] xl:text-[2.5rem] 2xl:text-[2.7rem]">
              {corePhilosophy.mainSegments.map((segment) => (
                <span key={segment} className="inline-block">
                  {segment}
                </span>
              ))}
            </span>
            <span className="mt-1 block text-[1.65rem] leading-[1.75] text-bordeaux md:text-[2.2rem] md:leading-[1.7] lg:text-[2rem] xl:text-[2.5rem] 2xl:text-[2.7rem]">
              {corePhilosophy.sub}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={250} as="p" className="mt-8 max-w-md text-sm leading-loose text-ink-muted md:text-[0.95rem]">
            {heroCopy.lead.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={450} className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="/philosophy">私たちについて</LinkButton>
            <LinkButton href="/business" variant="ghost">
              事業を見る
            </LinkButton>
          </ScrollReveal>

          {/* スクロール誘導 */}
          <ScrollReveal delay={700} className="mt-14 hidden items-center gap-3 md:flex">
            <span className="font-en text-[0.65rem] font-semibold tracking-[0.28em] text-ink-muted">
              SCROLL
            </span>
            <span className="relative h-14 w-px overflow-hidden bg-line-soft">
              <span className="animate-scroll-hint absolute inset-0 bg-bordeaux" />
            </span>
          </ScrollReveal>
        </div>

        {/* 写真コラージュ（PC） */}
        <div
          ref={collageRef}
          className="relative hidden h-[560px] lg:block"
          aria-label="Arteriaに関わる人々の写真"
        >
          <div
            data-parallax="0.06"
            className="parallax-item absolute left-0 top-24 w-[46%] will-change-transform"
          >
            <ScrollReveal variant="clip" delay={200}>
              <MediaSlotImage
                slotId="hero-person-01"
                sizes="(max-width: 768px) 45vw, 22vw"
                priority
                className="shadow-sm"
              />
            </ScrollReveal>
          </div>
          <div
            data-parallax="0.11"
            className="parallax-item absolute right-0 top-0 w-[52%] will-change-transform"
          >
            <ScrollReveal variant="clip" delay={350}>
              <MediaSlotImage
                slotId="hero-team-01"
                sizes="(max-width: 768px) 50vw, 26vw"
                priority
                className="shadow-sm"
              />
            </ScrollReveal>
          </div>
          <div
            data-parallax="0.045"
            className="parallax-item absolute right-[8%] top-[46%] w-[34%] will-change-transform"
          >
            <ScrollReveal variant="clip" delay={500}>
              <div className="animate-float-soft">
                <MediaSlotImage
                  slotId="hero-person-02"
                  sizes="(max-width: 768px) 34vw, 16vw"
                  className="shadow-sm"
                />
              </div>
            </ScrollReveal>
          </div>
          <div
            data-parallax="0.09"
            className="parallax-item absolute bottom-0 left-[6%] w-[44%] will-change-transform"
          >
            <ScrollReveal variant="clip" delay={650}>
              <MediaSlotImage
                slotId="hero-person-03"
                sizes="(max-width: 768px) 44vw, 20vw"
                className="shadow-sm"
              />
            </ScrollReveal>
          </div>
        </div>

        {/* 写真（SP・タブレット：枚数を減らして表示） */}
        <div className="grid grid-cols-5 gap-3 lg:hidden">
          <ScrollReveal variant="clip" delay={150} className="col-span-3">
            <MediaSlotImage slotId="hero-person-01" sizes="60vw" priority />
          </ScrollReveal>
          <ScrollReveal variant="clip" delay={300} className="col-span-2 self-end">
            <MediaSlotImage slotId="hero-person-02" sizes="40vw" />
          </ScrollReveal>
          <ScrollReveal variant="clip" delay={450} className="col-span-5">
            <MediaSlotImage slotId="hero-team-01" sizes="100vw" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
