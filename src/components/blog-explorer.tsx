"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge, Button, Card, FilterPanel } from "@/components/ui";
import type { JournalPost } from "@/data/posts";

type FilterValue = "All";

function uniqueValues(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export function BlogExplorer({ posts }: { posts: JournalPost[] }) {
  const [category, setCategory] = useState<string | FilterValue>("All");
  const [region, setRegion] = useState<string | FilterValue>("All");
  const [targetFish, setTargetFish] = useState<string | FilterValue>("All");

  const featuredPost = posts[0];
  const categories = useMemo(() => uniqueValues(posts.map((post) => post.category)), [posts]);
  const regions = useMemo(() => uniqueValues(posts.map((post) => post.region)), [posts]);
  const targetFishOptions = useMemo(() => uniqueValues(posts.flatMap((post) => post.targetFish)), [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesRegion = region === "All" || post.region === region;
      const matchesFish = targetFish === "All" || post.targetFish.includes(targetFish);

      return matchesCategory && matchesRegion && matchesFish;
    });
  }, [category, posts, region, targetFish]);

  function clearFilters() {
    setCategory("All");
    setRegion("All");
    setTargetFish("All");
  }

  return (
    <div className="grid gap-8">
      <Link href={`/blog/${featuredPost.slug}`} className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
        <Card as="article" interactive className="overflow-hidden p-0">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[22rem] overflow-hidden bg-warm-gray">
              <Image
                src={featuredPost.coverImage}
                alt=""
                fill
                preload
                sizes="(min-width: 1024px) 58vw, 92vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: featuredPost.coverPosition ?? "50% 50%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/18" />
              <Badge className="absolute left-5 top-5 border-white/52 bg-white/88">Featured journal</Badge>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <p className="eyebrow">{featuredPost.category}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">{featuredPost.title}</h2>
              <p className="mt-4 text-base leading-7 text-ink/68">{featuredPost.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge>
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  {featuredPost.date}
                </Badge>
                <Badge>
                  <Clock3 className="size-3.5" aria-hidden="true" />
                  {featuredPost.readingTime}
                </Badge>
                <Badge tone="accent">{featuredPost.region}</Badge>
              </div>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-copper">
                Read featured article
                <ArrowRight className="size-4" aria-hidden="true" />
              </p>
            </div>
          </div>
        </Card>
      </Link>

      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <FilterPanel className="h-fit lg:sticky lg:top-24">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Archive</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-ink">Journal filters</h2>
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
              Region
              <select className="field-select" value={region} onChange={(event) => setRegion(event.target.value)}>
                <option>All</option>
                {regions.map((item) => (
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

            <Button type="button" variant="secondary" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        </FilterPanel>

        <div>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">All posts</p>
              <h2 className="font-display text-3xl font-semibold text-ink">{filteredPosts.length} journal notes</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-ink/62">Guides, trip reports and sober notes for Polish anglers planning Danish water.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
                <Card as="article" interactive className="h-full overflow-hidden p-0">
                  <div className="relative aspect-[16/10] overflow-hidden bg-warm-gray">
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 38vw, (min-width: 768px) 45vw, 92vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: post.coverPosition ?? "50% 50%" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/62 via-transparent to-transparent" />
                    <Badge className="absolute left-4 top-4 border-white/50 bg-white/88">{post.category}</Badge>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2">
                      <Badge>{post.region}</Badge>
                      <Badge>
                        <Clock3 className="size-3.5" aria-hidden="true" />
                        {post.readingTime}
                      </Badge>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink group-hover:text-channel">{post.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-ink/64">{post.excerpt}</p>
                    <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-copper">
                      Read article
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 ? (
            <Card className="mt-4 text-center">
              <h3 className="font-display text-2xl font-semibold text-ink">No journal notes match these filters</h3>
              <p className="mt-2 text-sm leading-6 text-ink/64">Clear one filter and return to the full archive.</p>
              <Button type="button" variant="secondary" className="mt-4" onClick={clearFilters}>
                Reset journal
              </Button>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
