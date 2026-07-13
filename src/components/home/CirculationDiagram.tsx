"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextLink } from "@/components/ui/LinkButton";
import { circulationModel } from "@/content/philosophy";

/** 円周上のノード位置（上から時計回り） */
const NODE_POSITIONS = [
  { left: "50%", top: "8%" },
  { left: "86.4%", top: "29%" },
  { left: "86.4%", top: "71%" },
  { left: "50%", top: "92%" },
  { left: "13.6%", top: "71%" },
  { left: "13.6%", top: "29%" },
];

/**
 * Arteriaがつくるキャリアの循環図。
 * 表示領域に入ると円の線が少しずつ描画される。
 */
export function CirculationDiagram() {
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-t border-line-soft bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              en={circulationModel.en}
              heading={["Arteriaがつくる、", "キャリアの循環。"]}
            />
            <ScrollReveal delay={150} as="p" className="mt-8 max-w-md text-sm leading-loose text-ink-muted">
              学びが仕事につながり、仕事が新たな経験を生み、その経験が次の機会へめぐっていく。Arteriaは人・企業・教育の真ん中に立ち、この循環を動かし続けます。
            </ScrollReveal>
            <ScrollReveal delay={250} className="mt-8 hidden lg:block">
              <TextLink href="/philosophy">詳しく見る</TextLink>
            </ScrollReveal>
          </div>

          <div
            ref={groupRef}
            className="draw-group relative mx-auto aspect-square w-full max-w-[560px]"
          >
            {/* 循環の円（描画アニメーション付き） */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
              fill="none"
            >
              <circle
                className="draw"
                cx="50"
                cy="50"
                r="42"
                pathLength={100}
                style={{ "--path-length": 100 } as CSSProperties}
                stroke="var(--color-bordeaux)"
                strokeOpacity="0.45"
                strokeWidth="0.4"
              />
              {/* 進行方向を示す矢印 */}
              {[
                { x: 79.7, y: 20.3, r: 45 },
                { x: 79.7, y: 79.7, r: 135 },
                { x: 20.3, y: 79.7, r: 225 },
                { x: 20.3, y: 20.3, r: 315 },
              ].map((a, i) => (
                <path
                  key={i}
                  d="M-1.6 -1.2 L1.2 0 L-1.6 1.2"
                  transform={`translate(${a.x} ${a.y}) rotate(${a.r})`}
                  stroke="var(--color-bordeaux)"
                  strokeWidth="0.5"
                  pathLength={100}
                  style={{ "--path-length": 100 } as CSSProperties}
                />
              ))}
            </svg>

            {/* 中央：Arteria */}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span className="font-en text-2xl font-extrabold tracking-tight text-bordeaux md:text-3xl">
                {circulationModel.center}
              </span>
              <span className="mt-1 text-[0.6rem] tracking-widest text-ink-muted md:text-xs">
                人・企業・教育をめぐる
              </span>
            </div>

            {/* 円周上のノード */}
            <ol>
              {circulationModel.nodes.map((node, i) => (
                <li
                  key={node.id}
                  className="absolute w-28 -translate-x-1/2 -translate-y-1/2 text-center md:w-36"
                  style={NODE_POSITIONS[i]}
                >
                  <span className="inline-block bg-ivory px-1 text-xs font-bold leading-snug text-ink md:text-sm">
                    {node.label}
                  </span>
                  <span className="mt-0.5 hidden text-[0.62rem] leading-tight text-ink-muted md:block">
                    {node.sub}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <ScrollReveal className="lg:hidden">
            <TextLink href="/philosophy">詳しく見る</TextLink>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
