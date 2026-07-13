/**
 * サイト全体で使うコンテンツの型定義。
 * コンテンツ本体は src/content/ 配下で管理する。
 */

/** 画像スロット（写真差し替え用プレースホルダー）の定義 */
export type MediaSlot = {
  /** 一意の画像スロットID（例: hero-person-01） */
  id: string;
  /** 実画像のパス。/public 配下に置き、ここにパスを設定すると表示される */
  src?: string;
  /** 代替テキスト */
  alt: string;
  /** 推奨アスペクト比（例: "4:5"） */
  aspectRatio: string;
  /** object-position（例: "center top"） */
  objectPosition?: string;
  /** 推奨構図・被写体・トーンなどの撮影指示 */
  description: string;
  /** 推奨人数（例: "1名", "3〜4名"） */
  people?: string;
  /** PCでの想定表示サイズ */
  pcSize?: string;
  /** スマートフォンでの想定表示サイズ */
  spSize?: string;
};

/** ニュース記事（後からCMSへ移行しやすいフラットな構造） */
export type NewsItem = {
  slug: string;
  /** 公開日（ISO形式: YYYY-MM-DD） */
  date: string;
  category: "お知らせ" | "プレスリリース" | "イベント";
  title: string;
  /** 本文（初期版は概要のみ） */
  summary?: string;
  /** 外部リンクにする場合のURL */
  href?: string;
  /**
   * サンプル記事フラグ。
   * true の記事は仮データであり、公開前に実記事へ差し替えること。
   */
  isSample?: boolean;
};

/** 事業定義 */
export type Business = {
  id: string;
  /** 表示番号（"01" など） */
  no: string;
  name: string;
  nameEn: string;
  /** 一覧・トップページ用の短い説明 */
  summary: string;
  /** 詳細ページ用の説明 */
  description: string;
  /** 詳細ページで箇条書きにする提供内容 */
  points: string[];
  /** 使用する画像スロットID */
  mediaSlotId: string;
  /** 詳細ページのアンカー付きリンク */
  href: string;
};

/** 特徴（Features） */
export type Feature = {
  no: string;
  title: string;
  description: string;
};

/** ナビゲーション項目 */
export type NavItem = {
  label: string;
  labelEn: string;
  href: string;
};

/** 会社概要の1項目。未確定情報は confirmed: false で管理する */
export type CompanyFact = {
  label: string;
  value: string;
  /** false の項目は仮データ。公開前に必ず確定させる */
  confirmed: boolean;
  note?: string;
};

/** 採用・提携の導線 */
export type EngagementPath = {
  id: string;
  kind: "recruit" | "partner";
  title: string;
  description: string;
  href: string;
};
