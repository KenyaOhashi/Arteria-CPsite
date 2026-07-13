# Arteria コーポレートサイト

株式会社Arteriaのコーポレートサイト。

> 学びと仕事と機会をめぐらせる、社会の動脈になる。

## 使用技術

| 領域 | 技術 |
| --- | --- |
| フレームワーク | Next.js 16（App Router） |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4（デザイントークンは `src/app/globals.css` の `@theme`） |
| フォント | Shippori Mincho（理念・見出し）/ Zen Kaku Gothic New（本文・UI）/ Manrope（英語・数字）— `next/font/google` で最適化読み込み |
| アニメーション | CSS Transitions / Keyframes + IntersectionObserver（外部ライブラリなし） |
| Lint | ESLint（eslint-config-next） |

## セットアップ

```bash
npm install
```

## 開発サーバー

```bash
npm run dev
# http://localhost:3000
```

## ビルド・確認

```bash
npm run build   # 本番ビルド（型チェック含む）
npm run start   # 本番ビルドの起動
npm run lint    # ESLint
npx tsc --noEmit  # 型チェックのみ
```

## ディレクトリ構成

```text
src/
├─ app/                 # ページ（App Router）
│  ├─ page.tsx          # トップページ
│  ├─ philosophy/ business/ company/ recruit/ news/ contact/ privacy/
│  ├─ layout.tsx        # 共通レイアウト・フォント・メタデータ・構造化データ
│  ├─ globals.css       # デザイントークン・アニメーション定義
│  ├─ sitemap.ts / robots.ts
│  └─ icon.tsx / opengraph-image.tsx   # 仮ファビコン・仮OGP（自動生成）
├─ components/
│  ├─ layout/           # Header / Footer / PageHeader
│  ├─ home/             # トップページ各セクション
│  ├─ ui/               # ScrollReveal / MediaSlotImage / LinkButton / SectionHeading / CTASection
│  ├─ news/ company/ contact/
├─ content/             # ★コンテンツデータ（テキスト・画像スロットはここを編集）
│  ├─ site.ts           # サイト設定（URL・タイトル・プレースホルダーモード）
│  ├─ company.ts        # 会社情報（未確定項目は confirmed: false）
│  ├─ philosophy.ts     # 理念・MVV・循環モデル
│  ├─ businesses.ts     # 3事業
│  ├─ features.ts       # 特徴4つ
│  ├─ news.ts           # ニュース記事（現在はサンプル3件）
│  ├─ navigation.ts     # ナビゲーション
│  ├─ recruit.ts        # 採用・提携の導線
│  ├─ contact.ts        # 問い合わせ種別
│  └─ media.ts          # ★画像スロット定義（全写真枠を一元管理）
├─ lib/
│  └─ contact.ts        # フォーム送信処理（仮実装・差し替えポイント）
└─ types/
   └─ content.ts        # コンテンツの型定義
```

## 画像の差し替え方

このサイトの写真枠はすべて「画像スロット」として `src/content/media.ts` で一元管理しています。

1. 写真を `public/images/` に置く（例: `public/images/hero-person-01.jpg`）
2. `src/content/media.ts` の該当スロットに `src` を追加する

   ```ts
   {
     id: "hero-person-01",
     src: "/images/hero-person-01.jpg",  // ← この1行を追加
     alt: "自然光の中で微笑む20代の人物",
     aspectRatio: "4:5",
     ...
   }
   ```

3. `.env.local` で本番画像モードに切り替える

   ```bash
   NEXT_PUBLIC_SHOW_IMAGE_PLACEHOLDERS=false
   ```

- 推奨形式: JPEG（写真）。長辺 1600px 程度、1枚 500KB 以下を目安
- 各スロットの推奨アスペクト比・構図・人数は `media.ts` の `description` などに記載
- 本番画像モードでも `src` 未設定のスロットは自動的にプレースホルダー表示になる

### 画像プレースホルダーモード

`NEXT_PUBLIC_SHOW_IMAGE_PLACEHOLDERS`（デフォルト: `true`）でワイヤーフレーム確認用モードになり、全画像枠にスロットID・推奨比率・推奨内容が表示されます。

## テキストの変更方法

コンポーネントではなく `src/content/` 配下のファイルを編集してください。

- 会社情報: `content/company.ts`（`confirmed: false` の項目は「確定前の仮情報」バッジ付きで表示されます）
- 理念・Mission/Vision: `content/philosophy.ts`
- 事業内容: `content/businesses.ts`
- ニュース: `content/news.ts`（`isSample: true` はサンプル記事。公開前に削除・差し替え）

## 問い合わせフォームの接続方法

現在は仮実装（フロントエンドで検証のみ、実送信なし）です。
`src/lib/contact.ts` の `submitContact()` の中身を差し替えるだけで接続できます。

- Next.js API Route / Server Action への POST
- フォームサービス（Formspree / SSGform / HubSpot 等）への POST
- Google フォームへの POST

UI側（`ContactForm.tsx`）は戻り値 `{ ok: boolean }` のみに依存しているため変更不要です。

## 公開方法

Vercel を推奨します（Next.js 16 をそのままデプロイ可能）。

1. GitHub リポジトリを Vercel にインポート
2. 環境変数を設定
   - `NEXT_PUBLIC_SITE_URL=https://（確定ドメイン）`
   - `NEXT_PUBLIC_SHOW_IMAGE_PLACEHOLDERS=false`（写真設定後）
3. デプロイ

他のホスティング（Cloudflare / AWS Amplify / 自前 Node サーバー `npm run start`）でも動作します。

## 未確定情報（公開前に必ず確定・差し替え）

| 項目 | 現状 | 管理場所 |
| --- | --- | --- |
| 所在地 | 仮表記 | `content/company.ts` |
| 電話番号・メールアドレス | 仮表記 | `content/company.ts` |
| 有料職業紹介事業許可番号 | 仮表記（未取得） | `content/company.ts` |
| 公開ドメイン | 仮URL | `.env` の `NEXT_PUBLIC_SITE_URL` |
| Mission / Vision | 案の段階 | `content/philosophy.ts` |
| 代表メッセージ | 仮文面（代表確認前） | `content/company.ts` |
| ニュース記事 | サンプル3件 | `content/news.ts` |
| プライバシーポリシー | ドラフト（専門家確認前） | `app/privacy/page.tsx` |
| 写真全枠 | プレースホルダー | `content/media.ts` |
| ファビコン・OGP画像 | 自動生成の仮画像 | `app/icon.tsx` / `app/opengraph-image.tsx` |
| 問い合わせ送信先 | 未接続（仮実装） | `lib/contact.ts` |

## 今後CMS化する場合の拡張方針

ニュースを CMS（microCMS / Newt / Contentful 等）へ移行する場合:

1. `content/news.ts` の `NewsItem` 型はフラットな構造（slug / date / category / title）のため、CMS のスキーマをそのまま対応させられます
2. `newsItems` 配列を CMS フェッチ関数（`async function getNews()`）に置き換え、`NewsSection` / `news/page.tsx` を `await` に変更
3. 記事詳細が必要になったら `app/news/[slug]/page.tsx` を追加

会社情報・事業・画像スロットも同様に、`content/` の各ファイルが実質的なスキーマ定義になっています。
