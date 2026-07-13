/** ページ遷移ごとに再マウントされ、自然なフェードインを与える */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
