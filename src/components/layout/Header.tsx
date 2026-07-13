"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { globalNav, contactNav } from "@/content/navigation";

/**
 * グローバルヘッダー。
 * - 初期状態は半透明、スクロール後はアイボリー背景へ変化
 * - PCは横並び、スマートフォンはハンバーガーメニュー
 * - 現在地のリンクをボルドーで示す
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ページ遷移でメニューを閉じる（render中の状態調整パターン）
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // メニュー表示中は背面のスクロールを止める
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    if (!path) return false;
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        menuOpen
          ? // backdrop-filter は fixed 子要素（モバイルメニュー）の包含ブロックに
            // なってしまうため、メニュー展開中はブラーなしの不透明背景にする
            "bg-ivory shadow-[0_1px_0_0_var(--color-line-soft)]"
          : scrolled
            ? "bg-ivory/90 shadow-[0_1px_0_0_var(--color-line-soft)] backdrop-blur-md"
            : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className="relative z-50 font-en text-2xl font-extrabold tracking-tight text-bordeaux transition-opacity hover:opacity-80"
          aria-label="Arteria トップページ"
        >
          Arteria
        </Link>

        {/* PCナビゲーション */}
        <nav aria-label="グローバルナビゲーション" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {globalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`group relative py-2 font-en text-[0.82rem] font-semibold tracking-[0.08em] transition-colors ${
                    isActive(item.href)
                      ? "text-bordeaux"
                      : "text-ink hover:text-bordeaux"
                  }`}
                >
                  {item.labelEn}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px w-full bg-bordeaux transition-transform duration-300 ${
                      isActive(item.href)
                        ? "scale-x-100"
                        : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={contactNav.href}
                className="inline-flex min-h-10 items-center rounded-full bg-bordeaux px-6 py-2 font-en text-[0.82rem] font-semibold tracking-[0.08em] text-paper transition-colors duration-300 hover:bg-bordeaux-dark"
              >
                {contactNav.labelEn}
              </Link>
            </li>
          </ul>
        </nav>

        {/* ハンバーガーボタン（SP） */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          className="relative z-50 flex h-12 w-12 items-center justify-center lg:hidden"
        >
          <span className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-ink transition-all duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-ink transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-full bg-ink transition-all duration-300 ${
                menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* モバイルメニュー */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-ivory transition-[opacity,visibility] duration-300 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav
          aria-label="モバイルナビゲーション"
          className="flex h-full flex-col justify-center px-10"
        >
          <ul className="space-y-1">
            {globalNav.map((item, i) => (
              <li
                key={item.href}
                className={`transition-all duration-500 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: menuOpen ? `${80 + i * 50}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex items-baseline gap-4 py-3 ${
                    isActive(item.href) ? "text-bordeaux" : "text-ink"
                  }`}
                >
                  <span className="font-en text-xl font-bold tracking-wide">
                    {item.labelEn}
                  </span>
                  <span className="text-xs text-ink-muted">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div
            className={`mt-8 transition-all duration-500 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "420ms" : "0ms" }}
          >
            <Link
              href={contactNav.href}
              onClick={() => setMenuOpen(false)}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-bordeaux px-8 py-3 font-en text-base font-semibold tracking-wide text-paper"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
