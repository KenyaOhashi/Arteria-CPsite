/**
 * サイト全体の設定。
 *
 * NEXT_PUBLIC_SHOW_IMAGE_PLACEHOLDERS:
 *   "false" にすると本番画像モードになる。
 *   本番画像モードでは media.ts の src が設定された画像を表示し、
 *   src が無いスロットのみプレースホルダーへフォールバックする。
 *   デフォルト（未設定）はワイヤーフレーム確認用のプレースホルダーモード。
 */
export const siteConfig = {
  name: "株式会社Arteria",
  nameEn: "Arteria Co., Ltd.",
  /** 仮ドメイン。独自ドメイン確定後に .env の NEXT_PUBLIC_SITE_URL を設定する */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://arteria.example.com",
  title: "株式会社Arteria｜学びと仕事と機会をめぐらせる",
  description:
    "株式会社Arteriaは、人と企業と教育をつなぎ、学びや経験をキャリアにつながる価値へ変える会社です。人材紹介、教育・キャリア開発、パートナー連携を通じて、新しい仕事と機会の循環をつくります。",
  copyright: "© Arteria Co., Ltd. All Rights Reserved.",
  /** 画像プレースホルダーモード（ワイヤーフレーム確認用） */
  showImagePlaceholders:
    (process.env.NEXT_PUBLIC_SHOW_IMAGE_PLACEHOLDERS ?? "true") !== "false",
} as const;
