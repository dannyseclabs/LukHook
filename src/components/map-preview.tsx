import { ArrowRight, MapPinned } from "lucide-react";

import { ButtonLink } from "@/components/ui";

const markerPositions = [
  "left-[28%] top-[32%]",
  "left-[54%] top-[42%]",
  "left-[68%] top-[28%]",
  "left-[42%] top-[62%]",
  "left-[76%] top-[68%]",
  "left-[18%] top-[58%]"
];

type MapPreviewProps = {
  title?: string;
  description?: string;
  href?: string;
  cta?: string;
  markerCount?: number;
};

export function MapPreview({
  title = "Open the interactive Denmark map",
  description = "Filter spots by fish, region, water type, method, season and difficulty on the dedicated map page.",
  href = "/map",
  cta = "Open Interactive Map",
  markerCount = markerPositions.length
}: MapPreviewProps) {
  return (
    <div className="map-frame surface-panel relative isolate overflow-hidden rounded-xl">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(107_136_165_/_0.09)_1px,transparent_1px),linear-gradient(0deg,rgb(107_136_165_/_0.08)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_34%_30%,rgb(231_220_203_/_0.56),transparent_17rem),radial-gradient(circle_at_72%_58%,rgb(107_136_165_/_0.18),transparent_19rem)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[58%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-[44%_56%_48%_52%] border border-channel/18 bg-white/28 shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.38)]" />
      <div className="absolute left-[42%] top-[22%] -z-10 h-[42%] w-[28%] rotate-12 rounded-[50%_40%_44%_52%] border border-channel/14 bg-channel/8" />

      {markerPositions.slice(0, markerCount).map((position, index) => (
        <span
          key={position}
          className={`absolute ${position} h-5 w-5 rounded-full border-[3px] border-white shadow-[0_10px_22px_rgb(16_36_62_/_0.18)] ${index % 3 === 0 ? "bg-copper" : "bg-channel"}`}
          aria-hidden="true"
        />
      ))}

      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-border-soft/90 bg-white/82 px-3 py-2 text-xs font-extrabold uppercase text-ink shadow-[0_10px_26px_rgb(16_36_62_/_0.08)] backdrop-blur-md">
        <MapPinned className="size-4 text-channel" aria-hidden="true" />
        Static preview
      </div>

      <div className="absolute inset-x-5 bottom-5 rounded-xl border border-border-soft/90 bg-white/86 p-5 shadow-[0_18px_42px_rgb(16_36_62_/_0.1)] backdrop-blur-md sm:inset-x-auto sm:right-5 sm:w-[23rem]">
        <p className="eyebrow">Live Map</p>
        <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-ink/68">{description}</p>
        <ButtonLink href={href} className="mt-5">
          {cta}
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </div>
  );
}
