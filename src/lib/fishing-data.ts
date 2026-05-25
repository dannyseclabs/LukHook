import spotsJson from "@/data/fishing-spots.json";

export type WaterType = "coast" | "lake" | "river" | "pier" | "put & take";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type FishingSpot = {
  id: string;
  name: string;
  region: string;
  type: WaterType;
  coordinates: [number, number];
  species: string[];
  bestMonths: string[];
  difficulty: Difficulty;
  methods: string[];
  recommendedGear: string[];
  tactics: string[];
  estimatedTime: string;
  legalNotes: string[];
  safetyNotes: string[];
};

export type RegionGuide = {
  name: string;
  slug: string;
  center: [number, number];
  summary: string;
  typicalFish: string[];
  styles: string[];
  difficulty: Difficulty;
  weatherLegalWarnings: string[];
};

export type FishGuide = {
  name: string;
  slug: string;
  tagline: string;
  whereToFind: string[];
  bestMonths: string[];
  bestTimeOfDay: string;
  gear: string[];
  lures: string[];
  tactics: string[];
  beginnerMistakes: string[];
  legalNote: string;
};

export const fishingSpots = spotsJson as FishingSpot[];

export const regions: RegionGuide[] = [
  {
    name: "North Jutland",
    slug: "north-jutland",
    center: [57.15, 9.8],
    summary: "Open coast, Limfjord edges and piers with wind-driven opportunities.",
    typicalFish: ["Sea trout", "Cod", "Flatfish", "Perch", "Pike"],
    styles: ["coastal spinning", "pier jigging", "bottom fishing", "light spinning"],
    difficulty: "Intermediate",
    weatherLegalWarnings: [
      "Exposed coasts and piers can become unsafe in swell.",
      "Check harbour access signs and species rules before keeping fish."
    ]
  },
  {
    name: "West Jutland",
    slug: "west-jutland",
    center: [56.1, 8.25],
    summary: "Windy fjords, surf beaches and harbour structures with big-water conditions.",
    typicalFish: ["Pike", "Perch", "Flatfish", "Cod", "Mackerel"],
    styles: ["brackish pike spinning", "surf bottom fishing", "pier jigging"],
    difficulty: "Advanced",
    weatherLegalWarnings: [
      "North Sea wind can change the plan fast; keep a sheltered backup.",
      "Brackish and freshwater areas may need local fishing cards or permissions."
    ]
  },
  {
    name: "East Jutland",
    slug: "east-jutland",
    center: [56.05, 9.8],
    summary: "Fjords, lakes and accessible coastline for methodical day trips.",
    typicalFish: ["Sea trout", "Pike", "Perch", "Flatfish"],
    styles: ["wading", "lake spinning", "drop shot", "bombarda fishing"],
    difficulty: "Intermediate",
    weatherLegalWarnings: [
      "Fjord protection zones around streams must be checked before fishing.",
      "Many lakes are association waters requiring a local permit."
    ]
  },
  {
    name: "Funen",
    slug: "funen",
    center: [55.35, 10.35],
    summary: "One of Denmark's classic sea trout islands with varied coast and beginner lakes.",
    typicalFish: ["Sea trout", "Garfish", "Flatfish", "Rainbow trout"],
    styles: ["coastal lure fishing", "fly fishing", "put and take", "bottom rigs"],
    difficulty: "Intermediate",
    weatherLegalWarnings: [
      "Move with wind direction; many productive places need careful wading.",
      "Check closed zones near streams and local lake rules."
    ]
  },
  {
    name: "Zealand",
    slug: "zealand",
    center: [55.55, 11.75],
    summary: "Fjords, points and urban access with strong options close to population centers.",
    typicalFish: ["Sea trout", "Garfish", "Flatfish", "Perch"],
    styles: ["coastal spinning", "fly fishing", "harbour light spinning"],
    difficulty: "Beginner",
    weatherLegalWarnings: [
      "Respect private shore access and nesting areas.",
      "Use official maps for sea trout protection zones."
    ]
  },
  {
    name: "South Zealand / Møn",
    slug: "south-zealand-mon",
    center: [55.05, 12.05],
    summary: "Beaches, chalk coasts and clear water for flatfish and sea trout.",
    typicalFish: ["Flatfish", "Sea trout", "Garfish"],
    styles: ["surf casting", "coastal spinning", "sight-led wading"],
    difficulty: "Intermediate",
    weatherLegalWarnings: [
      "Cliff areas require serious attention to access and rockfall danger.",
      "Protected nature areas may limit access or parking."
    ]
  },
  {
    name: "Bornholm",
    slug: "bornholm",
    center: [55.12, 14.9],
    summary: "Rocky Baltic fishing with high reward and higher demand for safety.",
    typicalFish: ["Sea trout", "Cod", "Garfish"],
    styles: ["rock coast spinning", "fly fishing", "jigging"],
    difficulty: "Advanced",
    weatherLegalWarnings: [
      "Sea trout closed seasons may differ from mainland rules.",
      "Rock shelves are dangerous in swell and spray."
    ]
  },
  {
    name: "Copenhagen area",
    slug: "copenhagen-area",
    center: [55.68, 12.58],
    summary: "Urban harbour fishing, easy sessions and quick access after work.",
    typicalFish: ["Perch", "Cod", "Garfish", "Flatfish"],
    styles: ["light spinning", "jigging", "drop shot", "pier fishing"],
    difficulty: "Beginner",
    weatherLegalWarnings: [
      "Harbour rules vary by quay and season; signs matter.",
      "Cast safely around pedestrians, cyclists and boats."
    ]
  }
];

export const fishGuides: FishGuide[] = [
  {
    name: "Sea trout",
    slug: "sea-trout",
    tagline: "The iconic Danish coastal target: mobile, moody and worth the walk.",
    whereToFind: ["coastal reefs", "eelgrass beds", "fjord points", "current near stream mouths outside closed zones"],
    bestMonths: ["March", "April", "May", "September", "October"],
    bestTimeOfDay: "Dawn, dusk and overcast windy windows. In cold water, midday sun can also help.",
    gear: ["9-10 ft rod", "2500-3000 reel", "thin braid", "fluorocarbon leader", "waders and belt"],
    lures: ["coastal spoons", "slim wobblers", "shrimp flies", "bombarda rigs"],
    tactics: ["walk and cover water", "fish structure before wading over it", "change speed often", "move after quiet water"],
    beginnerMistakes: ["wading too far too early", "staying too long in dead water", "ignoring wind direction", "not checking protection zones"],
    legalNote: "Sea trout minimum sizes, spawning-colour rules and stream-mouth closed zones are critical. Verify current rules before each trip."
  },
  {
    name: "Pike",
    slug: "pike",
    tagline: "Ambush predator fishing for lakes, reed lines and brackish edges.",
    whereToFind: ["shallow bays", "weed beds", "reed lines", "drop-offs", "brackish fjord edges"],
    bestMonths: ["May", "June", "September", "October", "November"],
    bestTimeOfDay: "Stable weather windows, late morning in cold water and low-light periods in clear shallows.",
    gear: ["7-8 ft heavy spinning rod", "4000 reel", "strong braid", "wire or heavy fluorocarbon trace", "long pliers"],
    lures: ["large softbaits", "jerkbaits", "spinnerbaits", "shallow crankbaits"],
    tactics: ["slow retrieves over weed", "long pauses beside cover", "fan cast shallow bays", "handle fish quickly and wet-handed"],
    beginnerMistakes: ["fishing without bite trace", "using undersized landing gear", "overplaying fish", "forgetting closed season checks"],
    legalNote: "Pike can have closed seasons and local restrictions. Check national and water-specific rules before targeting or retaining fish."
  },
  {
    name: "Perch",
    slug: "perch",
    tagline: "Beginner-friendly, technical enough to stay interesting, and perfect for light gear.",
    whereToFind: ["lakes", "harbours", "canals", "walls", "bridges", "drop-offs"],
    bestMonths: ["May", "June", "July", "August", "September", "October"],
    bestTimeOfDay: "Morning and evening around cover; midday can work when fish school deep.",
    gear: ["6-7 ft light spinning rod", "1000-2500 reel", "thin braid", "light fluorocarbon leader"],
    lures: ["small jigs", "drop shot worms", "micro crankbaits", "metal vibes"],
    tactics: ["search with jigs", "slow down when you find a school", "fish walls vertically", "use smaller lures in clear water"],
    beginnerMistakes: ["using tackle too heavy", "striking too hard", "leaving active schools too soon", "ignoring pike bite-offs"],
    legalNote: "Perch is accessible, but local lake or harbour permissions still apply. Check signs and local rules."
  },
  {
    name: "Cod",
    slug: "cod",
    tagline: "A classic pier, coast and boat fish where regulations demand extra attention.",
    whereToFind: ["piers", "harbour mouths", "rocky coast", "deeper channels", "boat marks"],
    bestMonths: ["May", "June", "September", "October", "November"],
    bestTimeOfDay: "Moving water, low light and rougher conditions near structure.",
    gear: ["10-11 ft pier rod", "4000-5000 reel", "heavier braid", "jigs or bottom rigs"],
    lures: ["metal jigs", "soft shads", "pirk-style jigs", "baited bottom rigs"],
    tactics: ["keep contact with bottom", "fish structure edges", "change jig weight with current", "release fish quickly if retention is restricted"],
    beginnerMistakes: ["using tackle too light for current", "not checking cod rules", "letting rigs snag", "fishing unsafe breakwaters"],
    legalNote: "Cod rules in Danish waters can change. Treat this guide as tactical only and verify current retention rules before fishing."
  },
  {
    name: "Flatfish",
    slug: "flatfish",
    tagline: "Reliable beach and pier fishing with simple rigs and strong beginner value.",
    whereToFind: ["sandy beaches", "piers", "harbour channels", "sand patches between weed"],
    bestMonths: ["April", "May", "June", "September", "October"],
    bestTimeOfDay: "Tide or current movement matters more than clock time; evenings are often comfortable from beaches.",
    gear: ["10-12 ft surf or pier rod", "4000-5000 reel", "two-hook rigs", "60-100 g sinkers"],
    lures: ["baited bottom rigs", "beads and attractors", "sandworm", "ragworm", "fish strips"],
    tactics: ["cast to clean sand", "move every 20-30 minutes", "use small bait pieces", "tighten line and watch subtle bites"],
    beginnerMistakes: ["casting over fish close to shore", "using huge hooks", "leaving bait unchecked", "not measuring kept fish"],
    legalNote: "Minimum sizes and species-specific protection can apply. Measure fish and check current Danish rules before keeping them."
  }
];

export const legalSources = [
  {
    label: "Official licence system",
    href: "https://fisketegn.dk/en"
  },
  {
    label: "Danish recreational fisheries",
    href: "https://lfst.dk/english/recreational-fisheries"
  },
  {
    label: "Fishing in Denmark rules guide",
    href: "https://fishingindenmark.info/en/information-and-rules"
  }
];

export const waterTypeLabels: Record<WaterType, string> = {
  coast: "Coast",
  lake: "Lake",
  river: "River",
  pier: "Pier",
  "put & take": "Put & take"
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/ø/g, "o")
    .replace(/æ/g, "ae")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function getRegionBySlug(slug: string) {
  return regions.find((region) => region.slug === slug);
}

export function getFishBySlug(slug: string) {
  return fishGuides.find((fish) => fish.slug === slug);
}

export function getSpotById(id: string) {
  return fishingSpots.find((spot) => spot.id === id);
}

export function spotsForRegion(regionName: string) {
  return fishingSpots.filter((spot) => spot.region === regionName);
}

export function spotsForFish(fishName: string) {
  return fishingSpots.filter((spot) => spot.species.includes(fishName));
}
