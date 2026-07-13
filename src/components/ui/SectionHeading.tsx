import { ScrollReveal } from "@/components/ui/ScrollReveal";

type SectionHeadingProps = {
  /** 英語のセクションラベル（例: PHILOSOPHY） */
  en: string;
  /** 日本語見出し。改行したい場合は配列で渡す */
  heading: string | string[];
  /** 見出しレベル */
  level?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
};

/** セクション共通の見出し（英語ラベル + 明朝の日本語見出し） */
export function SectionHeading({
  en,
  heading,
  level = "h2",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const Tag = level;
  const lines = Array.isArray(heading) ? heading : [heading];
  return (
    <ScrollReveal
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      <p className="font-en text-xs font-bold tracking-[0.22em] text-bordeaux">
        {en}
      </p>
      <Tag className="mt-4 font-serif-jp text-[1.45rem] font-semibold leading-relaxed tracking-wide text-ink md:text-4xl md:leading-[1.6]">
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    </ScrollReveal>
  );
}
