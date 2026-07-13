import { ScrollReveal } from "@/components/ui/ScrollReveal";

type PageHeaderProps = {
  /** 英語ラベル（例: PHILOSOPHY） */
  en: string;
  title: string;
  lead?: string;
};

/** 下層ページ共通のページヘッダー */
export function PageHeader({ en, title, lead }: PageHeaderProps) {
  return (
    <div className="border-b border-line-soft bg-ivory pt-16 md:pt-20">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <ScrollReveal>
          <p className="font-en text-xs font-bold tracking-[0.26em] text-bordeaux">
            {en}
          </p>
          <h1 className="mt-5 font-serif-jp text-3xl font-semibold leading-relaxed tracking-wide text-ink md:text-[2.6rem]">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-sm leading-loose text-ink-muted md:text-[0.95rem]">
              {lead}
            </p>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
}
