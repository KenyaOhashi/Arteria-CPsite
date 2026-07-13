import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { corePhilosophy } from "@/content/philosophy";
import { companyFacts } from "@/content/company";
import { siteConfig } from "@/content/site";

/** グローバルフッター */
export function Footer() {
  const address = companyFacts.find((f) => f.label === "所在地");
  const contact = companyFacts.find((f) => f.label === "連絡先");

  return (
    <footer className="border-t border-line-soft bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-en text-3xl font-extrabold tracking-tight text-bordeaux">
              Arteria
            </p>
            <p className="mt-4 font-serif-jp text-sm leading-loose tracking-wide text-ink">
              {corePhilosophy.main}
              <br />
              {corePhilosophy.sub}
            </p>
          </div>

          <nav aria-label="フッターナビゲーション">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {footerNav.map((item) => (
                <li key={`${item.href}-${item.labelEn}`}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-baseline gap-2 py-1 text-sm text-ink transition-colors hover:text-bordeaux"
                  >
                    <span className="font-en text-xs font-semibold tracking-[0.08em]">
                      {item.labelEn}
                    </span>
                    <span className="hidden text-xs text-ink-muted transition-colors group-hover:text-bordeaux md:inline">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm leading-relaxed text-ink-muted">
            <p className="font-medium text-ink">{siteConfig.name}</p>
            <p className="mt-1 font-en text-xs tracking-wide">
              {siteConfig.nameEn}
            </p>
            {address && <p className="mt-4 text-xs">{address.value}</p>}
            {contact && <p className="mt-1 text-xs">{contact.value}</p>}
          </div>
        </div>

        <p className="mt-14 border-t border-line-soft pt-6 text-center font-en text-xs tracking-[0.08em] text-ink-muted">
          {siteConfig.copyright}
        </p>
      </div>
    </footer>
  );
}
