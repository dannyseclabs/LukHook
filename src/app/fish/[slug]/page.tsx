import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Fish, MapPinned, ShieldAlert, Target } from "lucide-react";

import { LegalNotice } from "@/components/legal-notice";
import { SpotList } from "@/components/spot-list";
import { fishGuides, getFishBySlug, spotsForFish } from "@/lib/fishing-data";

export function generateStaticParams() {
  return fishGuides.map((fish) => ({ slug: fish.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const fish = getFishBySlug(slug);

  return {
    title: fish ? `${fish.name} Fishing in Denmark` : "Fish guide",
    description: fish?.tagline
  };
}

export default async function FishPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fish = getFishBySlug(slug);

  if (!fish) {
    notFound();
  }

  const spots = spotsForFish(fish.name);

  return (
    <main id="main-content">
      <section className="border-b border-ink/10 bg-mist">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <p className="eyebrow">Fish guide</p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-ink">{fish.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/68">{fish.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {fish.bestMonths.map((month) => (
                <span key={month} className="tag">{month}</span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-ink">Trip timing</h2>
            <p className="mt-4 text-sm leading-6 text-ink/68">{fish.bestTimeOfDay}</p>
            <Link href="/map" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-copper px-4 py-2 text-sm font-semibold text-ink transition hover:bg-copper-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
              Find spots
              <MapPinned className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <GuideBlock icon={MapPinned} title="Where to find" items={fish.whereToFind} />
        <GuideBlock icon={Target} title="Gear and lures" items={[...fish.gear, ...fish.lures]} />
        <GuideBlock icon={Fish} title="Tactics" items={fish.tactics} />
      </section>

      <section className="border-y border-ink/10 bg-paper">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-lg border border-ink/10 bg-paper p-5">
            <div className="flex items-center gap-3">
              <Clock className="size-6 text-channel" aria-hidden="true" />
              <h2 className="font-display text-2xl font-semibold text-ink">Beginner mistakes</h2>
            </div>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-ink/68">
              {fish.beginnerMistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-warning/25 bg-warning/10 p-5">
            <div className="flex items-center gap-3">
              <ShieldAlert className="size-6 text-warning-dark" aria-hidden="true" />
              <h2 className="font-display text-2xl font-semibold text-ink">Legal note</h2>
            </div>
            <p className="mt-5 text-sm leading-6 text-ink/72">{fish.legalNote}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold text-ink">Matching spots</h2>
        <div className="mt-6">
          <SpotList spots={spots} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <LegalNotice />
        <div className="mt-8 flex flex-wrap gap-3">
          {fishGuides.filter((item) => item.slug !== fish.slug).map((item) => (
            <Link key={item.slug} href={`/fish/${item.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-ink/10 bg-paper px-4 py-2 text-sm font-semibold text-ink transition hover:border-channel/40 hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
              {item.name}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function GuideBlock({ icon: Icon, title, items }: { icon: typeof MapPinned; title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-sm">
      <Icon className="size-6 text-channel" aria-hidden="true" />
      <h2 className="mt-5 font-display text-2xl font-semibold text-ink">{title}</h2>
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-ink/68">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
