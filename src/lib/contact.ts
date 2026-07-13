import type { ContactFormValues } from "@/content/contact";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * お問い合わせ送信処理（仮実装）。
 *
 * ⚠️ 現時点では送信先が未確定のため、実際の送信は行わない。
 * 送信先確定後、この関数の中身を以下のいずれかに差し替える：
 * - Next.js API Route / Server Action への POST
 * - フォームサービス（Formspree, SSGform, HubSpot など）への POST
 * - Google フォームへのリダイレクトまたは POST
 *
 * 呼び出し側（ContactForm）はこの関数の戻り値だけに依存しているため、
 * 差し替えてもUIの変更は不要。
 */
export async function submitContact(
  values: ContactFormValues,
): Promise<SubmitResult> {
  // 開発時に内容を確認できるようログのみ出力する
  console.info("[contact] 送信内容（仮実装のため実送信はしていません）", values);
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { ok: true };
}
