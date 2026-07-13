"use client";

import { useEffect, useRef } from "react";
import { MediaSlotImage } from "@/components/ui/MediaSlotImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

const GALLERY_SLOTS = [
  { id: "gallery-person-01", width: "w-52 md:w-60" },
  { id: "gallery-person-02", width: "w-48 md:w-56" },
  { id: "gallery-person-03", width: "w-72 md:w-88" },
  { id: "gallery-person-04", width: "w-52 md:w-64" },
  { id: "gallery-person-05", width: "w-48 md:w-56" },
  { id: "gallery-person-06", width: "w-72 md:w-88" },
  { id: "gallery-person-07", width: "w-60 md:w-72" },
  { id: "gallery-person-08", width: "w-52 md:w-60" },
];

/**
 * 人物写真の横スクロールギャラリー。
 * - ゆっくり自動スクロール（ホバー・操作・reduced-motion で停止）
 * - ユーザーによる手動スクロール、前後ボタンにも対応
 */
export function PeopleGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    const step = (t: number) => {
      const dt = Math.min(t - last, 100);
      last = t;
      if (!pausedRef.current) {
        track.scrollLeft += dt * 0.016; // 約16px/秒のゆっくりした流れ
        const half = track.scrollWidth / 2;
        if (track.scrollLeft >= half) track.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };
  const scrollByAmount = (amount: number) => {
    pause();
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    window.setTimeout(resume, 1200);
  };

  return (
    <section
      className="overflow-hidden border-t border-line-soft bg-ivory py-20 md:py-28"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 md:px-8">
        <SectionHeading
          en="PEOPLE"
          heading={["それぞれの時間が、", "新しい可能性につながっていく。"]}
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => scrollByAmount(-360)}
            aria-label="ギャラリーを左へスクロール"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 font-en text-ink transition-colors hover:border-bordeaux hover:text-bordeaux"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(360)}
            aria-label="ギャラリーを右へスクロール"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 font-en text-ink transition-colors hover:border-bordeaux hover:text-bordeaux"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerEnter={pause}
        onPointerLeave={resume}
        onTouchStart={pause}
        onTouchEnd={() => window.setTimeout(resume, 2000)}
        onFocus={pause}
        onBlur={resume}
        className="no-scrollbar mt-12 flex gap-5 overflow-x-auto px-5 md:px-8"
        tabIndex={0}
        role="region"
        aria-label="人物写真ギャラリー（横スクロール）"
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 gap-5"
          >
            {GALLERY_SLOTS.map((slot, i) => (
              <div
                key={slot.id}
                className={`${slot.width} shrink-0 ${i % 2 === 1 ? "mt-8" : ""}`}
              >
                <div className="overflow-hidden transition-transform duration-500 hover:scale-[1.03]">
                  <MediaSlotImage
                    slotId={slot.id}
                    sizes="(max-width: 768px) 60vw, 22rem"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
