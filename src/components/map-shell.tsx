"use client";

import dynamic from "next/dynamic";

function MapSkeleton() {
  return (
    <div
      className="map-frame surface-panel relative overflow-hidden rounded-xl"
      role="status"
      aria-label="Loading fishing map"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(107_136_165_/_0.09)_1px,transparent_1px),linear-gradient(0deg,rgb(107_136_165_/_0.08)_1px,transparent_1px)] bg-[size:52px_52px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_36%,rgb(231_220_203_/_0.5),transparent_16rem),radial-gradient(circle_at_72%_62%,rgb(107_136_165_/_0.18),transparent_18rem)]" />
      <div className="absolute left-5 top-5 h-9 w-32 rounded-full bg-white/72 shadow-[0_10px_28px_rgb(16_36_62_/_0.08)]" />
      <div className="absolute right-6 top-8 h-5 w-5 rounded-full bg-marine/70" />
      <div className="absolute left-[48%] top-[42%] h-5 w-5 rounded-full bg-channel/70" />
      <div className="absolute bottom-6 left-6 right-6 h-14 rounded-lg border border-border-soft/90 bg-white/68 backdrop-blur-sm" />
      <span className="sr-only">Loading Fishing Map...</span>
    </div>
  );
}

const MapClient = dynamic(() => import("@/components/map-client"), {
  ssr: false,
  loading: () => <MapSkeleton />
});

export function MapShell() {
  return <MapClient />;
}
