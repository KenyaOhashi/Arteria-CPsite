import Link from "next/link";
import type { ReactNode } from "react";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 px-7 py-3 text-sm font-medium tracking-wider transition-all duration-300";

const variants = {
  primary:
    "bg-bordeaux text-paper hover:bg-bordeaux-dark hover:shadow-lg hover:shadow-bordeaux/20",
  ghost:
    "border border-ink/25 text-ink hover:border-bordeaux hover:text-bordeaux",
} as const;

/** 矢印付きのリンクボタン */
export function LinkButton({
  href,
  children,
  variant = "primary",
  className = "",
}: LinkButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="font-en transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

/** テキストリンク（下線スライド付き） */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 py-2 text-sm font-medium text-ink transition-colors hover:text-bordeaux ${className}`}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-bordeaux transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"
        />
      </span>
      <span
        aria-hidden="true"
        className="font-en transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
