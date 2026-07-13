import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Arteria Co., Ltd.";

/**
 * 仮OGP画像（ビルド時に自動生成）。
 * 正式なOGP画像が用意できたら public/ に置き、layout.tsx の
 * openGraph.images で参照するよう差し替える。
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f4ef",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 14,
            background: "#9f1d2d",
          }}
        />
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            color: "#9f1d2d",
            fontFamily: "Georgia, serif",
            letterSpacing: -2,
          }}
        >
          Arteria
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: "#6f6760",
            letterSpacing: 6,
          }}
        >
          ARTERIA CO., LTD.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 14,
            background: "#9f1d2d",
          }}
        />
      </div>
    ),
    size,
  );
}
