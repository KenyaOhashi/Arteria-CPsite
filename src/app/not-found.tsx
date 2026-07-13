import Link from "next/link";
import { LinkButton } from "@/components/ui/LinkButton";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center px-5 pt-20 text-center">
      <p className="font-en text-7xl font-extrabold text-bordeaux">404</p>
      <h1 className="mt-6 font-serif-jp text-xl font-semibold text-ink md:text-2xl">
        お探しのページが見つかりませんでした。
      </h1>
      <p className="mt-4 text-sm leading-loose text-ink-muted">
        URLが変更されたか、ページが削除された可能性があります。
      </p>
      <div className="mt-10">
        <LinkButton href="/">トップページへ戻る</LinkButton>
      </div>
      <Link
        href="/contact"
        className="mt-6 text-sm text-bordeaux underline underline-offset-4 hover:opacity-80"
      >
        お困りの場合はお問い合わせください
      </Link>
    </div>
  );
}
