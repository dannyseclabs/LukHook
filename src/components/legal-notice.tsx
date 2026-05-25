import { ShieldAlert } from "lucide-react";

import { legalSources } from "@/lib/fishing-data";

export function LegalNotice() {
  return (
    <aside className="rounded-lg border border-warning/30 bg-warning/10 p-5 text-ink">
      <div className="flex gap-3">
        <ShieldAlert className="mt-1 size-5 shrink-0 text-warning-dark" aria-hidden="true" />
        <div>
          <h2 className="font-display text-xl font-semibold">Legal check before fishing</h2>
          <p className="mt-2 text-sm leading-6 text-ink/70">
            Danish fishing rules can change by species, area and season. Use this planner for trip preparation, then verify licence, minimum size, closed season and local access rules with official sources before fishing.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {legalSources.map((source) => (
              <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center rounded-md border border-warning/30 bg-paper px-3 py-2 text-sm font-semibold text-ink transition hover:border-warning-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning-dark">
                {source.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
