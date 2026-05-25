import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Fish, MapPin, ShieldAlert, Waves } from "lucide-react";

import { LegalNotice } from "@/components/legal-notice";
import { fishGuides, fishingSpots, getSpotById, slugify, waterTypeLabels } from "@/lib/fishing-data";

export function generateStaticParams() {
  return fishingSpots.map((spot) => ({ id: spot.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const spot = getSpotById(id);

  return {
    title: spot ? `${spot.name} Fishing Guide` : "Fishing spot guide",
    description: spot ? `${spot.region} ${waterTypeLabels[spot.type]} guide for ${spot.species.join(", ")}.` : undefined
  };
}

export default async function SpotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const spot = getSpotById(id);

  if (!spot) {
    notFound();
  }

  return (
    <main id="main-content">
      <section className="border-b border-ink/10 bg-mist">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <p className="eyebrow">Spot guide</p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-ink">{spot.name}</h1>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="tag">
                <MapPin className="size-3.5" aria-hidden="true" />
                {spot.region}
              </span>
              <span className="tag">
                <Waves className="size-3.5" aria-hidden="true" />
                {waterTypeLabels[spot.type]}
              </span>
              <span className="tag">
                <Clock className="size-3.5" aria-hidden="true" />
                {spot.estimatedTime}
              </span>
              <span className="tag">{spot.difficulty}</span>
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-ink">Targets</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {spot.species.map((species) => {
                const fishSlug = slugify(species);
                const hasGuide = fishGuides.some((fish) => fish.slug === fishSlug);
                const content = (
                  <>
                    <Fish className="size-3.5" aria-hidden="true" />
                    {species}
                  </>
                );

                return hasGuide ? (
                  <Link key={species} href={`/fish/${fishSlug}`} className="tag transition hover:border-channel hover:text-channel">
                    {content}
                  </Link>
                ) : (
                  <span key={species} className="tag">
                    {content}
                  </span>
                );
              })}
            </div>
            <p className="mt-5 text-sm leading-6 text-ink/68">Best months: {spot.bestMonths.join(", ")}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <InfoBlock title="Recommended gear" items={spot.recommendedGear} />
        <InfoBlock title="Tactics" items={spot.tactics} />
        <InfoBlock title="Methods" items={spot.methods} />
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-4 pb-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-lg border border-warning/25 bg-warning/10 p-5">
          <div className="flex items-center gap-3">
            <ShieldAlert className="size-6 text-warning-dark" aria-hidden="true" />
            <h2 className="font-display text-2xl font-semibold text-ink">Safety and legal notes</h2>
          </div>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-ink/72">
            {[...spot.legalNotes, ...spot.safetyNotes].map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-ink/10 bg-paper p-5">
          <h2 className="font-display text-2xl font-semibold text-ink">Preparation plan</h2>
          <ol className="mt-5 grid gap-3 text-sm leading-6 text-ink/68">
            <li>Check official licence and species rules for the exact date.</li>
            <li>Confirm weather, wind direction and access before leaving.</li>
            <li>Pack gear around the main method: {spot.methods.slice(0, 2).join(" or ")}.</li>
            <li>Reserve {spot.estimatedTime} for fishing plus travel and rigging time.</li>
          </ol>
          <Link href="/map" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-copper px-4 py-2 text-sm font-semibold text-ink transition hover:bg-copper-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
            Back to map
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <LegalNotice />
      </section>
    </main>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-sm">
      <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-ink/68">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
