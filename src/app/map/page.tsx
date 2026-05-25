import { MapShell } from "@/components/map-shell";
import { SectionHeading } from "@/components/section-heading";
import { LegalNotice } from "@/components/legal-notice";

export default function MapPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading kicker="Interactive map" title="Filter Danish fishing spots by the way you actually plan" description="Use species, region, water type, difficulty, season and method to narrow the map. Click a marker or a spot in the list for gear, tactics and legal notes." />
      <div className="mt-8">
        <MapShell />
      </div>
      <div className="mt-8">
        <LegalNotice />
      </div>
    </main>
  );
}
