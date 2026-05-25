import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CloudSun, Fish, MapPinned } from "lucide-react";

import { LegalNotice } from "@/components/legal-notice";
import { MapShell } from "@/components/map-shell";
import { SpotList } from "@/components/spot-list";
import { getRegionBySlug, regions, spotsForRegion } from "@/lib/fishing-data";

export function generateStaticParams() {
  return regions.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  return {
    title: region ? `${region.name} Fishing Guide` : "Region guide",
    description: region?.summary
  };
}

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  const spots = spotsForRegion(region.name);

  return (
    <main id="main-content">
      <section className="border-b border-ink/10 bg-mist">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <p className="eyebrow">Region guide</p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-ink">{region.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/68">{region.summary}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {region.typicalFish.map((fish) => (
                <span key={fish} className="tag">
                  <Fish className="size-3.5" aria-hidden="true" />
                  {fish}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-ink">Planning summary</h2>
            <dl className="mt-5 grid gap-4">
              <div>
                <dt className="text-xs font-bold uppercase tracking-normal text-ink/50">Difficulty</dt>
                <dd className="mt-1 text-base font-semibold text-ink">{region.difficulty}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-normal text-ink/50">Best styles</dt>
                <dd className="mt-1 text-sm leading-6 text-ink/68">{region.styles.join(", ")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <MapPinned className="size-6 text-channel" aria-hidden="true" />
          <h2 className="font-display text-3xl font-semibold text-ink">Region map</h2>
        </div>
        <MapShell />
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <aside className="rounded-lg border border-ink/10 bg-paper p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <CloudSun className="size-6 text-warning-dark" aria-hidden="true" />
            <h2 className="font-display text-2xl font-semibold text-ink">Weather and legal warnings</h2>
          </div>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-ink/68">
            {region.weatherLegalWarnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </aside>
        <div>
          <h2 className="font-display text-3xl font-semibold text-ink">Recommended spots</h2>
          <div className="mt-5">
            <SpotList spots={spots} />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <LegalNotice />
        <div className="mt-8 flex flex-wrap gap-3">
          {regions.filter((item) => item.slug !== region.slug).slice(0, 4).map((item) => (
            <Link key={item.slug} href={`/regions/${item.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-ink/10 bg-paper px-4 py-2 text-sm font-semibold text-ink transition hover:border-channel/40 hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
              {item.name}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
