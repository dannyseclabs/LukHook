import type { Metadata } from "next";
import { BookOpen, Camera, MapPinned } from "lucide-react";

import { BlogExplorer } from "@/components/blog-explorer";
import { Badge, Card, Container, PageHeader, Section } from "@/components/ui";
import { posts } from "@/data/posts";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Journal | LukHook",
  description: "Fishing journal, Danish guide notes and practical advice for Polish anglers from Łukasz Wojciechowski."
};

export default function BlogPage() {
  return (
    <main id="main-content">
      <Section className="border-b border-channel/16 pb-8">
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <PageHeader
            kicker="Journal"
            title="Danish fishing notes from a Polish angler’s road north."
            description="Practical guides, trip reports, gear notes, regulation reminders and photo-journal stories written for anglers planning real Denmark sessions."
            className="lg:block"
          >
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge tone="accent">
                <BookOpen className="size-3.5" aria-hidden="true" />
                Static articles
              </Badge>
              <Badge>
                <MapPinned className="size-3.5" aria-hidden="true" />
                Denmark focused
              </Badge>
            </div>
          </PageHeader>

          <Card className="surface-soft">
            <div className="flex items-start gap-3">
              <Camera className="mt-1 size-5 shrink-0 text-channel" aria-hidden="true" />
              <div>
                <p className="eyebrow">Editorial archive</p>
                <p className="mt-3 text-sm leading-6 text-ink/70">
                  Built from local static content now, ready for a future admin panel when Łukasz starts publishing regularly.
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container>
          <BlogExplorer posts={posts} />
        </Container>
      </Section>
    </main>
  );
}
