"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("@/components/map-client"), {
  ssr: false,
  loading: () => <div className="map-frame surface-panel flex items-center justify-center rounded-xl text-sm font-semibold text-ink/68">Loading Fishing Map…</div>
});

export function MapShell() {
  return <MapClient />;
}
