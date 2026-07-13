/**
 * 理念・ブランドストーリー。
 * Mission / Vision は「案」段階のため、確定後にここを差し替える。
 */

export const corePhilosophy = {
  main: "学びと仕事と機会をめぐらせる、",
  /** 改行位置を制御するための分節（スマートフォンでの不自然な折り返し防止） */
  mainSegments: ["学びと仕事と機会を", "めぐらせる、"],
  sub: "社会の動脈になる。",
  en: "CORE PHILOSOPHY",
};

export const heroCopy = {
  lead: [
    "人と企業と教育をつなぎ、",
    "一人ひとりが積み重ねてきた経験を、",
    "キャリアにつながる価値へ変える。",
  ],
};

export const brandStory = {
  heading: "一人ひとりが積み重ねてきた時間を、次の機会へつなげる。",
  paragraphs: [
    "人生とは、時間の積み重ねである。人はその時間の中で、学び、経験し、失敗し、出会い、少しずつ変わっていく。その一つひとつは、最初から意味のある形をしているとは限らない。",
    "しかし、点のように散らばった学びや経験は、いつか線になり、面になり、その人の人生を形づくっていく。",
    "Arteriaは、その積み重ねを価値に変え、キャリアにつながる機会へ届ける会社である。学びが仕事につながり、仕事が新たな経験を生み、その経験が次の機会へめぐっていく。人と企業と教育の間に循環をつくる。",
  ],
};

/** Mission / Vision（案）。確定後に差し替える */
export const mvv = {
  mission: {
    label: "Mission",
    text: "学びと経験を、キャリアにつながる価値へ変える。",
  },
  vision: {
    label: "Vision",
    text: "人と企業と教育が循環し、一人ひとりが人生を謳歌できる社会をつくる。",
  },
};

/** 点 → 線 → 面 → 循環 の図解ステップ */
export const philosophySteps = [
  {
    id: "dot",
    label: "点",
    labelEn: "DOT",
    text: "学び・経験・失敗・出会い",
    detail:
      "一つひとつの経験は、最初はばらばらの点にすぎない。うまくいったことも、いかなかったことも、すべてが素材になる。",
  },
  {
    id: "line",
    label: "線",
    labelEn: "LINE",
    text: "点がつながり、経験が意味を持つ",
    detail:
      "散らばっていた点は、ふとしたきっかけでつながり、線になる。過去の経験が、いまの自分を説明する言葉に変わる。",
  },
  {
    id: "plane",
    label: "面",
    labelEn: "PLANE",
    text: "強みや価値が整理され、キャリアの軸になる",
    detail:
      "線が重なると面になる。強みや価値観が整理され、その人だけのキャリアの軸が立ち上がる。",
  },
  {
    id: "circulation",
    label: "循環",
    labelEn: "CIRCULATION",
    text: "仕事、経験、学び、次の機会へめぐる",
    detail:
      "軸が定まった人は、仕事の中でまた新しい経験を積み、学び直し、次の機会へ進んでいく。めぐりは止まらない。",
  },
] as const;

/** Circulation Model（トップページの循環図） */
export const circulationModel = {
  heading: "Arteriaがつくる、キャリアの循環。",
  en: "CIRCULATION MODEL",
  center: "Arteria",
  nodes: [
    { id: "learn", label: "学ぶ", sub: "教育・知識・気づき" },
    { id: "skill", label: "スキルになる", sub: "学びを実践に変える" },
    { id: "work", label: "仕事につながる", sub: "人や企業と出会う" },
    { id: "experience", label: "経験が生まれる", sub: "挑戦と成長を重ねる" },
    { id: "next", label: "次の機会につながる", sub: "可能性が広がる" },
    { id: "relearn", label: "新しい学びへ戻る", sub: "あらためて学び直す" },
  ],
};
