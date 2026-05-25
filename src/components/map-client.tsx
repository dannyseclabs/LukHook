"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import { Clock, Filter, MapPin, ShieldAlert, SlidersHorizontal, Waves } from "lucide-react";

import { fishingSpots, type FishingSpot, waterTypeLabels } from "@/lib/fishing-data";

type Filters = {
  species: string;
  region: string;
  type: string;
  difficulty: string;
  season: string;
  method: string;
};

const emptyFilters: Filters = {
  species: "all",
  region: "all",
  type: "all",
  difficulty: "all",
  season: "all",
  method: "all"
};

function unique(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function markerClasses(spot: Pick<FishingSpot, "difficulty" | "type">) {
  const safeType = spot.type.replaceAll(" ", "-").replace("&", "and");
  const heat = spot.difficulty === "Advanced" ? "marker-hot" : "marker-standard";

  return `marker-${safeType} ${heat}`;
}

function iconForSpot(spot: FishingSpot) {
  return divIcon({
    className: "",
    html: `<span class="map-marker ${markerClasses(spot)}" aria-hidden="true"></span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
}

function SelectField({
  label,
  name,
  value,
  options,
  onChange
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink">
      {label}
      <select name={name} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm font-medium text-ink shadow-sm transition focus-visible:border-channel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function MapClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeSpotId, setActiveSpotId] = useState(fishingSpots[0]?.id ?? "");

  const filters = useMemo<Filters>(
    () => ({
      species: searchParams.get("species") ?? emptyFilters.species,
      region: searchParams.get("region") ?? emptyFilters.region,
      type: searchParams.get("type") ?? emptyFilters.type,
      difficulty: searchParams.get("difficulty") ?? emptyFilters.difficulty,
      season: searchParams.get("season") ?? emptyFilters.season,
      method: searchParams.get("method") ?? emptyFilters.method
    }),
    [searchParams]
  );

  const options = useMemo(
    () => ({
      species: unique(fishingSpots.flatMap((spot) => spot.species)),
      regions: unique(fishingSpots.map((spot) => spot.region)),
      types: unique(fishingSpots.map((spot) => waterTypeLabels[spot.type])),
      difficulties: unique(fishingSpots.map((spot) => spot.difficulty)),
      seasons: unique(fishingSpots.flatMap((spot) => spot.bestMonths)),
      methods: unique(fishingSpots.flatMap((spot) => spot.methods))
    }),
    []
  );

  const filteredSpots = useMemo(() => {
    return fishingSpots.filter((spot) => {
      const typeLabel = waterTypeLabels[spot.type];
      return (
        (filters.species === "all" || spot.species.includes(filters.species)) &&
        (filters.region === "all" || spot.region === filters.region) &&
        (filters.type === "all" || typeLabel === filters.type) &&
        (filters.difficulty === "all" || spot.difficulty === filters.difficulty) &&
        (filters.season === "all" || spot.bestMonths.includes(filters.season)) &&
        (filters.method === "all" || spot.methods.includes(filters.method))
      );
    });
  }, [filters]);

  const activeSpot = filteredSpots.find((spot) => spot.id === activeSpotId) ?? filteredSpots[0];

  function updateFilter(key: keyof Filters, value: string) {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    router.replace(`${pathname}${nextParams.size ? `?${nextParams.toString()}` : ""}`, { scroll: false });
  }

  function resetFilters() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
      <section className="rounded-lg border border-ink/10 bg-paper p-4 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Filters</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">Find fishable water</h2>
          </div>
          <Filter className="size-5 text-channel" aria-hidden="true" />
        </div>

        <div className="mt-5 grid gap-4">
          <SelectField label="Fish species" name="species" value={filters.species} options={options.species} onChange={(value) => updateFilter("species", value)} />
          <SelectField label="Region" name="region" value={filters.region} options={options.regions} onChange={(value) => updateFilter("region", value)} />
          <SelectField label="Water type" name="type" value={filters.type} options={options.types} onChange={(value) => updateFilter("type", value)} />
          <SelectField label="Difficulty" name="difficulty" value={filters.difficulty} options={options.difficulties} onChange={(value) => updateFilter("difficulty", value)} />
          <SelectField label="Season" name="season" value={filters.season} options={options.seasons} onChange={(value) => updateFilter("season", value)} />
          <SelectField label="Method" name="method" value={filters.method} options={options.methods} onChange={(value) => updateFilter("method", value)} />
        </div>

        <button type="button" onClick={resetFilters} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-ink/15 bg-paper px-4 py-2 text-sm font-semibold text-ink transition hover:border-channel/40 hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Reset filters
        </button>

        <div className="mt-5 border-t border-ink/10 pt-5">
          <p className="text-sm font-semibold text-ink">{filteredSpots.length} matching spots</p>
          <div className="mt-3 grid gap-2">
            {filteredSpots.map((spot) => (
              <button key={spot.id} type="button" onClick={() => setActiveSpotId(spot.id)} className={`rounded-md border px-3 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel ${activeSpot?.id === spot.id ? "border-channel bg-channel/10" : "border-ink/10 bg-paper hover:border-channel/35"}`}>
                <span className="block text-sm font-semibold text-ink">{spot.name}</span>
                <span className="mt-1 block text-xs font-medium text-ink/58">{spot.region} · {waterTypeLabels[spot.type]} · {spot.difficulty}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-map">
        <div className="map-frame">
          <MapContainer center={[56.15, 10.15]} zoom={6.4} scrollWheelZoom zoomControl={false} className="h-full w-full">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ZoomControl position="bottomright" />
            {filteredSpots.map((spot) => (
              <Marker key={spot.id} position={spot.coordinates} icon={iconForSpot(spot)} eventHandlers={{ click: () => setActiveSpotId(spot.id) }}>
                <Popup>
                  <div className="space-y-2">
                    <strong>{spot.name}</strong>
                    <p>{spot.region} · {waterTypeLabels[spot.type]}</p>
                    <p>{spot.species.join(", ")}</p>
                    <a href={`/spots/${spot.id}`}>View full spot guide</a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="border-t border-ink/10 bg-paper p-5">
          {activeSpot ? <ActiveSpot spot={activeSpot} /> : <EmptyMapState />}
        </div>
      </section>
    </div>
  );
}

function ActiveSpot({ spot }: { spot: FishingSpot }) {
  return (
    <article className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <div>
        <div className="flex flex-wrap items-center gap-2">
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
        </div>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink">{spot.name}</h2>
        <p className="mt-3 text-sm leading-6 text-ink/66">{spot.species.join(", ")} · best months: {spot.bestMonths.join(", ")} · {spot.difficulty}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <MiniBlock title="Recommended gear" items={spot.recommendedGear} />
          <MiniBlock title="Tactics" items={spot.tactics} />
        </div>
      </div>
      <div className="rounded-lg border border-warning/25 bg-paper p-4">
        <div className="flex items-center gap-2 font-semibold text-ink">
          <ShieldAlert className="size-5 text-warning-dark" aria-hidden="true" />
          Safety and legal notes
        </div>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/68">
          {[...spot.legalNotes, ...spot.safetyNotes].map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <Link href={`/spots/${spot.id}`} className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-copper px-4 py-2 text-sm font-semibold text-ink transition hover:bg-copper-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-channel">
          View full spot guide
        </Link>
      </div>
    </article>
  );
}

function MiniBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="text-sm font-bold uppercase tracking-normal text-ink/56">{title}</h3>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/68">
        {items.slice(0, 5).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function EmptyMapState() {
  return (
    <div className="rounded-lg border border-ink/10 bg-paper p-5">
      <h2 className="font-display text-2xl font-semibold text-ink">No matching spots</h2>
      <p className="mt-2 text-sm leading-6 text-ink/66">Try removing one filter or choosing a broader season.</p>
    </div>
  );
}
