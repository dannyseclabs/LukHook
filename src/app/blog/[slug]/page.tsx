import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock3, MapPinned, PenLine } from "lucide-react";

import { Badge, ButtonLink, Card, Container, PageHeader, Section } from "@/components/ui";
import { getPostBySlug, posts } from "@/data/posts";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return {
    title: post ? `${post.title} | LukHook Journal` : "Journal article",
    description: post?.excerpt,
    alternates: post ? { canonical: `/blog/${post.slug}` } : undefined
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = posts
    .filter((item) => item.slug !== post.slug && (item.category === post.category || item.targetFish.some((fish) => post.targetFish.includes(fish))))
    .slice(0, 3);

  return (
    <main id="main-content">
      <Section className="border-b border-channel/16 pb-8">
        <Container>
          <PageHeader kicker={post.category} title={post.title} description={post.excerpt}>
            <ButtonLink href="/blog" variant="secondary">
              Journal archive
            </ButtonLink>
          </PageHeader>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>
              <CalendarDays className="size-3.5" aria-hidden="true" />
              {post.date}
            </Badge>
            <Badge>
              <Clock3 className="size-3.5" aria-hidden="true" />
              {post.readingTime}
            </Badge>
            <Badge tone="accent">
              <MapPinned className="size-3.5" aria-hidden="true" />
              {post.region}
            </Badge>
          </div>
        </Container>
      </Section>

      <Container className="pt-8">
        <div className="relative aspect-[16/8] min-h-[20rem] overflow-hidden rounded-xl border border-border-soft bg-warm-gray shadow-map">
          <Image
            src={post.coverImage}
            alt=""
            fill
            preload
            sizes="(min-width: 1280px) 1180px, 92vw"
            className="object-cover"
            style={{ objectPosition: post.coverPosition ?? "50% 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
            {post.targetFish.map((fish) => (
              <Badge key={fish} className="border-white/42 bg-white/86">
                {fish}
              </Badge>
            ))}
          </div>
        </div>
      </Container>

      <Section>
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,760px)_340px] lg:justify-between">
          <article className="surface-card rounded-xl p-6 sm:p-8">
            {post.content.map((section) => (
              <section key={section.heading} className="border-b border-border-soft py-7 first:pt-0 last:border-b-0 last:pb-0">
                <h2 className="font-display text-3xl font-semibold leading-tight text-ink">{section.heading}</h2>
                <div className="mt-4 grid gap-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-ink/72">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
            <Card className="surface-soft">
              <PenLine className="size-5 text-channel" aria-hidden="true" />
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink">About the author</h2>
              <p className="mt-3 text-sm font-semibold text-ink">{post.author}</p>
              <p className="mt-3 text-sm leading-6 text-ink/68">
                Polish angler exploring Danish waters, writing practical notes for fishermen who want honest planning, safe trips and fewer wasted kilometres.
              </p>
              <ButtonLink href="/about" variant="secondary" className="mt-5 w-full">
                About Łukasz
              </ButtonLink>
            </Card>

            <Card className="surface-danger">
              <p className="eyebrow">Regulation reminder</p>
              <p className="mt-3 text-sm leading-6 text-ink/72">
                Always verify licence, size limits, closed seasons and local access with official Danish sources before fishing.
              </p>
            </Card>
          </aside>
        </Container>
      </Section>

      <Section className="border-t border-channel/16 bg-channel/8">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Related journal notes</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Read next</h2>
            </div>
            <ButtonLink href="/blog" variant="secondary">
              All journal posts
            </ButtonLink>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {(relatedPosts.length > 0 ? relatedPosts : posts.filter((item) => item.slug !== post.slug).slice(0, 3)).map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
                <Card interactive className="h-full">
                  <Badge>{item.category}</Badge>
                  <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-ink group-hover:text-channel">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/64">{item.excerpt}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-copper">
                    Read note
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
