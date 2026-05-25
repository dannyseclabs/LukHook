"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("@/components/map-client"), {
  ssr: false,
  loading: () => <div className="map-frame flex items-center justify-center rounded-lg border border-ink/10 bg-paper text-sm font-semibold text-ink/60">Loading fishing map…</div>
});

export function MapShell() {
  return <MapClient />;
}
