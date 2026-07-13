import type { MediaSlot } from "@/types/content";

/**
 * 画像スロット管理ファイル。
 *
 * 【写真の差し替え方】
 * 1. 画像を public/images/ に置く（例: public/images/hero-person-01.jpg）
 * 2. 該当スロットの src に "/images/hero-person-01.jpg" を設定する
 * 3. NEXT_PUBLIC_SHOW_IMAGE_PLACEHOLDERS=false で本番画像モードにする
 *    （src が無いスロットのみプレースホルダーへフォールバックする）
 *
 * 【写真全体の方向性】
 * - 主に20代、男女混合。私服〜オフィスカジュアル中心でスーツ姿ばかりにしない
 * - 作りすぎた笑顔を避け、仕事中・会話中・考えている姿などを混ぜる
 * - 自然光・少し暖かいトーン・余白を含む構図・強すぎないコントラスト
 * - 人物の目線や向きは、レイアウト上の文章側へ向ける
 * - AI生成感の強い素材、就活サイト的な画一的写真は使わない
 */
const slots = [
  // ---- Hero ----
  {
    id: "hero-person-01",
    alt: "自然光の中で微笑む20代の人物",
    aspectRatio: "4:5",
    objectPosition: "center 30%",
    description: "20代人物・上半身・自然な笑顔・自然光",
    people: "1名",
    pcSize: "約300×375px",
    spSize: "約160×200px",
  },
  {
    id: "hero-person-02",
    alt: "仕事中の20代女性の横顔",
    aspectRatio: "1:1",
    objectPosition: "center",
    description: "20代女性・横顔・仕事中・柔らかい光",
    people: "1名",
    pcSize: "約220×220px",
    spSize: "約140×140px",
  },
  {
    id: "hero-person-03",
    alt: "考えごとをしている20代男性",
    aspectRatio: "3:2",
    objectPosition: "center",
    description: "20代男性・考える姿・視線は画面左（コピー側）へ",
    people: "1名",
    pcSize: "約300×200px",
    spSize: "約180×120px",
  },
  {
    id: "hero-team-01",
    alt: "オフィスで会議をする複数人のチーム",
    aspectRatio: "16:9",
    objectPosition: "center",
    description: "複数人・会議風景・オフィス・自然なやりとり",
    people: "3〜4名",
    pcSize: "約360×203px",
    spSize: "全幅×約190px",
  },

  // ---- Philosophy ----
  {
    id: "philosophy-person-01",
    alt: "学びに向き合う20代の人物",
    aspectRatio: "3:4",
    objectPosition: "center",
    description: "20代人物・学んでいる姿・手元や資料を含む構図",
    people: "1名",
    pcSize: "約280×373px",
    spSize: "約160×213px",
  },
  {
    id: "philosophy-person-02",
    alt: "会話をしながら考えを整理する二人",
    aspectRatio: "4:3",
    objectPosition: "center",
    description: "2名・会話中・カジュアルな服装・柔らかい距離感",
    people: "2名",
    pcSize: "約320×240px",
    spSize: "約200×150px",
  },

  // ---- People Gallery ----
  {
    id: "gallery-person-01",
    alt: "移動中の20代の人物",
    aspectRatio: "4:5",
    objectPosition: "center",
    description: "20代人物・移動中・街中・自然光",
    people: "1名",
    pcSize: "約240×300px",
    spSize: "約160×200px",
  },
  {
    id: "gallery-person-02",
    alt: "打ち合わせで説明をする20代の人物",
    aspectRatio: "3:4",
    objectPosition: "center",
    description: "誰かに説明している姿・身振りが伝わる構図",
    people: "1〜2名",
    pcSize: "約225×300px",
    spSize: "約150×200px",
  },
  {
    id: "gallery-person-03",
    alt: "ノートパソコンで作業する20代の人物",
    aspectRatio: "16:9",
    objectPosition: "center",
    description: "仕事中・PC作業・カフェまたはオフィス",
    people: "1名",
    pcSize: "約356×200px",
    spSize: "約240×135px",
  },
  {
    id: "gallery-person-04",
    alt: "談笑する二人の20代",
    aspectRatio: "1:1",
    objectPosition: "center",
    description: "2名・会話中・作りすぎない笑顔",
    people: "2名",
    pcSize: "約260×260px",
    spSize: "約170×170px",
  },
  {
    id: "gallery-person-05",
    alt: "資料を見ながら考える20代の人物",
    aspectRatio: "3:4",
    objectPosition: "center",
    description: "考えている姿・手元の資料・落ち着いたトーン",
    people: "1名",
    pcSize: "約225×300px",
    spSize: "約150×200px",
  },
  {
    id: "gallery-person-06",
    alt: "屋外で自然に過ごす20代の人物",
    aspectRatio: "16:9",
    objectPosition: "center",
    description: "オフィス外・屋外・リラックスした表情",
    people: "1名",
    pcSize: "約356×200px",
    spSize: "約240×135px",
  },
  {
    id: "gallery-person-07",
    alt: "ホワイトボードの前で議論するチーム",
    aspectRatio: "4:3",
    objectPosition: "center",
    description: "複数人で議論・ホワイトボード・動きのある構図",
    people: "3名前後",
    pcSize: "約280×210px",
    spSize: "約190×143px",
  },
  {
    id: "gallery-person-08",
    alt: "階段を上る20代の人物の後ろ姿",
    aspectRatio: "4:5",
    objectPosition: "center",
    description: "移動中・後ろ姿や横向きも可・前向きな空気感",
    people: "1名",
    pcSize: "約240×300px",
    spSize: "約160×200px",
  },

  // ---- Business ----
  {
    id: "business-recruitment-01",
    alt: "キャリア面談でサポートを受ける20代の人物",
    aspectRatio: "4:5",
    objectPosition: "center",
    description: "面談・サポートシーン・対話の温度が伝わる構図",
    people: "2名",
    pcSize: "約480×600px",
    spSize: "全幅×約420px",
  },
  {
    id: "business-education-01",
    alt: "研修で学ぶ20代の受講者たち",
    aspectRatio: "4:5",
    objectPosition: "center",
    description: "研修・学習シーン・手元やメモを含む構図",
    people: "2〜3名",
    pcSize: "約480×600px",
    spSize: "全幅×約420px",
  },
  {
    id: "business-partner-01",
    alt: "パートナー企業との打ち合わせ",
    aspectRatio: "4:5",
    objectPosition: "center",
    description: "打ち合わせ・握手や協働の空気・ビジネスカジュアル",
    people: "2〜4名",
    pcSize: "約480×600px",
    spSize: "全幅×約420px",
  },

  // ---- Recruit / Partner ----
  {
    id: "recruit-team-01",
    alt: "笑顔で働くArteriaのチーム",
    aspectRatio: "16:9",
    objectPosition: "center",
    description: "チーム・笑顔・カジュアル・風通しの良い空気感",
    people: "3〜5名",
    pcSize: "約560×315px",
    spSize: "全幅×約200px",
  },
  {
    id: "recruit-person-01",
    alt: "いきいきと働く20代のメンバー",
    aspectRatio: "3:4",
    objectPosition: "center",
    description: "1名・仕事中・自然な表情・若手の熱量",
    people: "1名",
    pcSize: "約300×400px",
    spSize: "約200×267px",
  },
  {
    id: "partner-meeting-01",
    alt: "提携パートナーとのミーティング",
    aspectRatio: "4:3",
    objectPosition: "center",
    description: "企業間ミーティング・信頼感・落ち着いたトーン",
    people: "2〜4名",
    pcSize: "約400×300px",
    spSize: "全幅×約240px",
  },

  // ---- Company ----
  {
    id: "representative-01",
    alt: "代表取締役 大橋賢也のポートレート",
    aspectRatio: "3:4",
    objectPosition: "center top",
    description: "代表ポートレート・自然光・堅すぎないビジネスカジュアル",
    people: "1名",
    pcSize: "約360×480px",
    spSize: "約240×320px",
  },
  {
    id: "director-01",
    alt: "取締役 千代直季のポートレート",
    aspectRatio: "3:4",
    objectPosition: "center top",
    description: "取締役ポートレート・自然光・代表とトーンを揃える",
    people: "1名",
    pcSize: "約360×480px",
    spSize: "約240×320px",
  },

  // ---- News / その他 ----
  {
    id: "news-visual-01",
    alt: "Arteriaのオフィスや活動の様子",
    aspectRatio: "16:9",
    objectPosition: "center",
    description: "オフィスや活動のイメージ・人物が写っていても可",
    people: "指定なし",
    pcSize: "約480×270px",
    spSize: "全幅×約200px",
  },
] satisfies MediaSlot[];

export type MediaSlotId = (typeof slots)[number]["id"];

export const mediaSlots: Record<string, MediaSlot> = Object.fromEntries(
  slots.map((slot) => [slot.id, slot]),
);

export function getMediaSlot(id: string): MediaSlot {
  const slot = mediaSlots[id];
  if (!slot) {
    // 未登録IDはビルド時に気づけるよう明示的に落とす
    throw new Error(`MediaSlot not found: ${id}`);
  }
  return slot;
}
