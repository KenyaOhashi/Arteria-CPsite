"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** 表示までの遅延（ms）。連続する要素のスタガーに使う */
  delay?: number;
  /** "up": フェード+上移動 / "clip": クリップマスク（画像向け） */
  variant?: "up" | "clip";
  as?: ElementType;
};

/**
 * スクロールで表示領域に入ったときに .is-visible を付与する。
 * 見た目の変化は globals.css の .reveal / .reveal-clip が担う。
 * JS無効時は最初から表示される（html[data-js] ガード）。
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = delay
    ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
    : undefined;

  if (variant === "clip") {
    // clip-path で完全に隠した要素は IntersectionObserver の交差面積が
    // 0 になり発火しないため、クリップは内側のラッパーに適用し、
    // 監視・is-visible の付与は外側の要素で行う
    return (
      <Tag ref={ref} className={`reveal-host ${className}`} style={style}>
        <div className="reveal-clip">{children}</div>
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
