import Image from "next/image";
import { getMediaSlot } from "@/content/media";
import { siteConfig } from "@/content/site";

type MediaSlotImageProps = {
  slotId: string;
  className?: string;
  /** next/image の sizes 属性 */
  sizes?: string;
  priority?: boolean;
};

function ratioToCss(ratio: string): string {
  const [w, h] = ratio.split(":");
  return `${w} / ${h}`;
}

/**
 * 画像スロット表示コンポーネント。
 *
 * - プレースホルダーモード（NEXT_PUBLIC_SHOW_IMAGE_PLACEHOLDERS が "false" 以外）:
 *   すべてのスロットをワイヤーフレーム用プレースホルダーで表示する
 * - 本番画像モード:
 *   src が設定されたスロットは実画像を表示し、
 *   未設定のスロットのみプレースホルダーへフォールバックする
 */
export function MediaSlotImage({
  slotId,
  className = "",
  sizes,
  priority,
}: MediaSlotImageProps) {
  const slot = getMediaSlot(slotId);
  const showPlaceholder = siteConfig.showImagePlaceholders || !slot.src;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratioToCss(slot.aspectRatio) }}
    >
      {showPlaceholder ? (
        <div
          className="media-placeholder"
          role="img"
          aria-label={`画像プレースホルダー：${slot.alt}`}
        >
          <span className="media-placeholder-id">IMAGE：{slot.id}</span>
          <span>Ratio：{slot.aspectRatio}</span>
          <span>{slot.description}</span>
        </div>
      ) : (
        <Image
          src={slot.src as string}
          alt={slot.alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: slot.objectPosition ?? "center" }}
        />
      )}
    </div>
  );
}
