# AGENTS.md — Arteria コーポレートサイト開発ガイド

このリポジトリで作業するAIエージェント・開発者向けのルール。

## 使用技術

- Next.js 16（App Router / Turbopack）+ TypeScript（strict）
- Tailwind CSS v4（`@theme` によるデザイントークン）
- フォント: `next/font/google`（Shippori Mincho / Zen Kaku Gothic New / Manrope）
- アニメーションは CSS + IntersectionObserver のみ。**アニメーションライブラリを追加しない**

## 開発コマンド

```bash
npm run dev        # 開発サーバー
npm run build      # 本番ビルド（型チェック含む）
npm run lint       # ESLint
npx tsc --noEmit   # 型チェック
```

## 変更時に必ず実行するチェック

1. `npx tsc --noEmit` — 型エラーゼロ
2. `npm run lint` — Lintエラーゼロ
3. `npm run build` — ビルド成功
4. レイアウト変更時は 375px / 768px / 1024px / 1440px で表示確認（横スクロールが出ないこと）
5. 画像プレースホルダーモード（デフォルト）と本番画像モードの両方で崩れないこと

## デザイン原則

- コンセプト:「若々しさ、思想性、躍動感、信頼感」。スタートアップの先進性 × 採用サイトの熱量 × コーポレートの信用
- 余白を大きく取り、タイポグラフィ中心。情報を詰め込みすぎない
- 動きは内容理解の補助。すべてを同時に動かさない・長すぎない・レイアウトシフトを起こさない
- モバイルでは演出を軽量化する

## カラー（globals.css の @theme で一元管理。直値をコンポーネントに書かない）

| トークン | 値 | 用途 |
| --- | --- | --- |
| `bordeaux` | #9f1d2d | メイン（CTA・アクセント・見出しラベル） |
| `bordeaux-dark` | #7f1724 | ホバー |
| `bordeaux-soft` | #b4515d | 補助 |
| `blush` / `blush-deep` | #f2e5e0 / #e2cdc6 | ピンクベージュのアクセント |
| `ivory` / `ivory-warm` / `paper` | #f7f4ef / #efeae2 / #fcfbf8 | 背景（完全な白は使わない） |
| `ink` / `ink-muted` | #2b2725 / #6f6760 | テキスト |
| `line-soft` | #e5ded4 | 罫線 |

## フォント

- `font-serif-jp`（Shippori Mincho）: 理念・大見出し・代表メッセージ・引用のみ
- `font-sans-jp`（Zen Kaku Gothic New）: 本文・UI（body デフォルト）
- `font-en`（Manrope）: 英語ラベル・数字・年号・セクション番号

## コンポーネント規約

- ページ = `src/app/`、再利用部品 = `src/components/`、テキストや設定 = `src/content/`
- **コンテンツをコンポーネントにハードコードしない**。必ず `src/content/` のデータを参照する
- クライアントコンポーネント（`"use client"`）はインタラクションが必要な場合のみ
- スクロール演出は `<ScrollReveal>`（variant: `up` / `clip`）を使う。独自実装を増やさない
  - 注意: `clip-path` で完全に隠した要素は IntersectionObserver が発火しない。クリップは内側ラッパーへ（ScrollReveal 実装済みのパターンを踏襲）
- 写真は必ず `<MediaSlotImage slotId="...">` を使う。`next/image` を直接使わない

## 画像スロットの管理ルール

- 全写真枠は `src/content/media.ts` に登録する（ID・alt・アスペクト比・構図指示・人数・表示サイズ）
- スロットIDは `セクション-被写体-連番`（例: `hero-person-01`）
- 新しい写真枠を追加するときは、必ず media.ts への登録とセットで行う
- 実画像は `public/images/` に置き、`src` を設定する
- `NEXT_PUBLIC_SHOW_IMAGE_PLACEHOLDERS`（デフォルト true）がプレースホルダーモードの切り替え

## アクセシビリティ要件

- セマンティックHTML・適切な見出し階層（h1はページに1つ）
- キーボード操作可能・`:focus-visible` のフォーカスリング維持
- 画像に代替テキスト（MediaSlot の `alt` 必須）
- 色だけに依存しない情報表現・十分なコントラスト
- フォームは label 関連付け・エラーは `role="alert"` + `aria-describedby`
- `prefers-reduced-motion` で自動アニメーション停止（globals.css で一括対応済み。新規アニメーションもここに追加する）
- JS無効時も内容が読めること（演出の初期非表示は `html[data-js]` ガード配下に書く）

## Arteriaのブランド上、避けるべき表現

- 青一色の人材会社的デザイン／就活サイト的な画一的人物写真／スーツの集合写真
- 医療・血液を直接連想させる動脈表現（赤い血管の描画など）
- 過剰なグラデーション・意味のない派手なアニメーション
- 文字が小さすぎる・情報過多なレイアウト
- AI生成感の強い人物素材
- 「設立予定」という表記（設立日は 2026年8月3日 と確定表記する）

## 未確定情報の扱い

- 所在地・連絡先・許可番号などの未確定項目は `content/company.ts` で `confirmed: false` として管理し、勝手に確定させない
- ニュースのサンプル記事は `isSample: true` を必ず付ける
