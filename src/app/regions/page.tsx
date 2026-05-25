import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { regions } from "@/lib/fishing-data";

export default function RegionsPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading kicker="Regions" title="Fishing regions in Denmark" description="Use regions to match driving distance, weather exposure, water type and legal checks before choosing the exact spot." />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {regions.map((region) => (
          <Link key={region.slug} href={`/regions/${region.slug}`} className="group rounded-lg border border-ink/10 bg-paper p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-channel/35 hover:shadow-map focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
            <MapPinned className="size-6 text-channel" aria-hidden="true" />
            <h2 className="mt-5 font-display text-2xl font-semibold text-ink group-hover:text-channel">{region.name}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/66">{region.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {region.typicalFish.slice(0, 4).map((fish) => (
                <span key={fish} className="tag">{fish}</span>
              ))}
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-channel">
              Open region
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
