import Link from "next/link";
import { Clock, MapPin } from "lucide-react";

import { type FishingSpot, waterTypeLabels } from "@/lib/fishing-data";

export function SpotList({ spots }: { spots: FishingSpot[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {spots.map((spot) => (
        <Link key={spot.id} href={`/spots/${spot.id}`} className="group rounded-lg border border-ink/10 bg-paper p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-channel/35 hover:shadow-map focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-normal text-channel">{spot.region}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink group-hover:text-channel">{spot.name}</h3>
            </div>
            <span className={`marker-dot marker-${spot.type.replaceAll(" ", "-").replace("&", "and")} ${spot.difficulty === "Advanced" ? "marker-hot" : "marker-standard"}`} aria-hidden="true" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="tag">
              <MapPin className="size-3.5" aria-hidden="true" />
              {waterTypeLabels[spot.type]}
            </span>
            <span className="tag">
              <Clock className="size-3.5" aria-hidden="true" />
              {spot.estimatedTime}
            </span>
            <span className="tag">{spot.difficulty}</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-ink/65">{spot.species.join(", ")}</p>
        </Link>
      ))}
    </div>
  );
}
