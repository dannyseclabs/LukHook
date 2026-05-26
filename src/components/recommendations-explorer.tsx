"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, SlidersHorizontal, XCircle } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge, Button, Card, FilterPanel } from "@/components/ui";
import type { Recommendation } from "@/data/recommendations";

type FilterValue = "All";

function uniqueValues(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export function RecommendationsExplorer({ recommendations }: { recommendations: Recommendation[] }) {
  const [category, setCategory] = useState<string | FilterValue>("All");
  const [targetFish, setTargetFish] = useState<string | FilterValue>("All");
  const [priceRange, setPriceRange] = useState<string | FilterValue>("All");
  const [beginnerFriendly, setBeginnerFriendly] = useState<string | FilterValue>("All");

  const categories = useMemo(() => uniqueValues(recommendations.map((item) => item.category)), [recommendations]);
  const targetFishOptions = useMemo(() => uniqueValues(recommendations.flatMap((item) => item.targetFish)), [recommendations]);
  const priceRanges = useMemo(() => uniqueValues(recommendations.map((item) => item.priceRange)), [recommendations]);

  const filteredRecommendations = useMemo(() => {
    return recommendations.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesFish = targetFish === "All" || item.targetFish.includes(targetFish);
      const matchesPrice = priceRange === "All" || item.priceRange === priceRange;
      const matchesBeginner =
        beginnerFriendly === "All" ||
        (beginnerFriendly === "Beginner friendly" && item.beginnerFriendly) ||
        (beginnerFriendly === "Experienced" && !item.beginnerFriendly);

      return matchesCategory && matchesFish && matchesPrice && matchesBeginner;
    });
  }, [beginnerFriendly, category, priceRange, recommendations, targetFish]);

  function clearFilters() {
    setCategory("All");
    setTargetFish("All");
    setPriceRange("All");
    setBeginnerFriendly("All");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <FilterPanel className="h-fit lg:sticky lg:top-24">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Curate</p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-ink">Gear filters</h2>
          </div>
          <SlidersHorizontal className="size-5 text-channel" aria-hidden="true" />
        </div>

        <div className="mt-5 grid gap-4">
          <label className="field-label">
            Category
            <select className="field-select" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option>All</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="field-label">
            Target fish
            <select className="field-select" value={targetFish} onChange={(event) => setTargetFish(event.target.value)}>
              <option>All</option>
              {targetFishOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="field-label">
            Price range
            <select className="field-select" value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
              <option>All</option>
              {priceRanges.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="field-label">
            Beginner fit
            <select className="field-select" value={beginnerFriendly} onChange={(event) => setBeginnerFriendly(event.target.value)}>
              <option>All</option>
              <option>Beginner friendly</option>
              <option>Experienced</option>
            </select>
          </label>

          <Button type="button" variant="secondary" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      </FilterPanel>

      <div>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Selected gear</p>
            <h2 className="font-display text-3xl font-semibold text-ink">{filteredRecommendations.length} recommendations</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-ink/62">Personal picks, not a shop catalogue. Use them as a practical starting point for your own budget and fishing style.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredRecommendations.map((item) => (
            <Link key={item.id} href={`/recommends/${item.id}`} className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
              <Card as="article" interactive className="h-full overflow-hidden p-0">
                <div className="relative aspect-[4/3] overflow-hidden bg-warm-gray">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: item.imagePosition ?? "50% 50%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/58 via-transparent to-transparent" />
                  <Badge className="absolute left-4 top-4 border-white/50 bg-white/88">{item.category}</Badge>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <Badge tone={item.beginnerFriendly ? "accent" : "default"}>
                      {item.beginnerFriendly ? (
                        <CheckCircle2 className="size-3.5" aria-hidden="true" />
                      ) : (
                        <XCircle className="size-3.5" aria-hidden="true" />
                      )}
                      {item.beginnerFriendly ? "Beginner friendly" : "Experienced"}
                    </Badge>
                    <span className="text-xs font-bold uppercase text-channel">{item.priceRange}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink group-hover:text-channel">{item.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-ink/74">{item.useCase}</p>
                  <p className="mt-3 text-sm leading-6 text-ink/62">{item.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.targetFish.map((fish) => (
                      <span key={fish} className="tag">
                        {fish}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-sm font-bold text-copper">View recommendation</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredRecommendations.length === 0 ? (
          <Card className="mt-4 text-center">
            <h3 className="font-display text-2xl font-semibold text-ink">No gear matches these filters</h3>
            <p className="mt-2 text-sm leading-6 text-ink/64">Clear one filter and try again. The local dataset is intentionally curated for the MVP.</p>
            <Button type="button" variant="secondary" className="mt-4" onClick={clearFilters}>
              Reset recommendations
            </Button>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
