import type { CompanyFact } from "@/types/content";

/**
 * 会社概要テーブル。
 * confirmed: false の項目には「確定前の仮情報」の注記を付けて表示する。
 */
export function CompanyTable({ facts }: { facts: CompanyFact[] }) {
  return (
    <dl className="divide-y divide-line-soft border-y border-line-soft">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6 sm:py-5"
        >
          <dt className="text-sm font-bold text-ink">{fact.label}</dt>
          <dd className="text-sm leading-relaxed text-ink-muted">
            {fact.value}
            {!fact.confirmed && (
              <span className="ml-2 inline-block rounded-sm bg-blush px-2 py-0.5 text-[0.65rem] tracking-wider text-bordeaux">
                確定前の仮情報
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
