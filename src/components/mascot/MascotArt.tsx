import Image from "next/image";

/**
 * The mascot artwork: the Minecraft crafting table stored in `public/images/`.
 *
 * This component is presentation only. The layer, positioning, opacity and
 * motion live in `Mascot.tsx`, so the artwork can be swapped again without
 * touching the movement or stacking logic. The source is a transparent PNG, so
 * the grid backdrop and both themes read through its empty areas.
 */
export function MascotArt() {
  return (
    <Image
      src="/images/minecraft-crafting-table-1.png"
      alt=""
      width={256}
      height={256}
      // Always in the viewport, so eager rather than lazy — but not preloaded:
      // the srcset already picks the right variant for the layer's size.
      loading="eager"
      draggable={false}
      // Matches the layer's resting sizes in Mascot.tsx, so the browser picks the
      // right bitmap for the display size instead of the largest one.
      sizes="(min-width: 1024px) 6rem, (min-width: 640px) 3.75rem, 3.5625rem"
      className="size-full object-contain"
    />
  );
}
