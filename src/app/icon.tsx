import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * 仮ファビコン（ボルドー地に「A」）。
 * 正式なロゴが決まったら public/ に favicon 一式を置き、このファイルを差し替える。
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#9f1d2d",
          color: "#fcfbf8",
          fontSize: 40,
          fontWeight: 800,
          fontFamily: "Georgia, serif",
          borderRadius: 12,
        }}
      >
        A
      </div>
    ),
    size,
  );
}
