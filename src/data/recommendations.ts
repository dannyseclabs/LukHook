export type RecommendationCategory =
  | "Rods"
  | "Reels"
  | "Lines"
  | "Lures"
  | "Waders"
  | "Clothing"
  | "Bags"
  | "Accessories"
  | "Books / maps";

export type Recommendation = {
  id: string;
  name: string;
  category: RecommendationCategory;
  targetFish: string[];
  useCase: string;
  priceRange: "Budget" | "Mid range" | "Premium" | "Specialist";
  beginnerFriendly: boolean;
  shortDescription: string;
  pros: string[];
  cons: string[];
  whyLukaszRecommendsIt: string;
  image: string;
  imagePosition?: string;
  externalLink?: string;
};

export const recommendationCategories: RecommendationCategory[] = [
  "Rods",
  "Reels",
  "Lines",
  "Lures",
  "Waders",
  "Clothing",
  "Bags",
  "Accessories",
  "Books / maps"
];

// TODO backend: replace this static list with database/CMS queries.
// TODO backend: add product recommendation editor, image upload, draft/publish status and Łukasz-only authentication.
// Future options: Supabase for a custom admin panel and relational control, or Sanity for easier editorial editing.
export const recommendations: Recommendation[] = [
  {
    id: "coastal-spinning-rod-270",
    name: "2.7 m coastal spinning rod",
    category: "Rods",
    targetFish: ["Sea trout", "Garfish", "Flatfish"],
    useCase: "Long coastal walks, spoons, slim wobblers and bombarda rigs in Danish wind.",
    priceRange: "Mid range",
    beginnerFriendly: true,
    shortDescription: "A balanced all-round rod length for Polish anglers starting Danish coastal fishing.",
    pros: ["Casts light coastal lures far enough", "Still comfortable during long walking sessions", "Works with common sea trout lure weights"],
    cons: ["Not ideal for heavy pier jigging", "Too long for tight harbour corners"],
    whyLukaszRecommendsIt:
      "For a first Danish coast setup, this is the practical middle ground. It gives reach, control and enough softness for sea trout without becoming specialist gear.",
    image: "/journal/lukasz-harbour-trout.jpeg",
    imagePosition: "50% 46%",
    externalLink: "#"
  },
  {
    id: "sealed-3000-spinning-reel",
    name: "Sealed 3000 spinning reel",
    category: "Reels",
    targetFish: ["Sea trout", "Perch", "Flatfish"],
    useCase: "Salt spray, harbour sessions and travel fishing where reliability matters more than decoration.",
    priceRange: "Mid range",
    beginnerFriendly: true,
    shortDescription: "A dependable reel size for Danish coast and harbour work.",
    pros: ["Good line capacity for braid", "Compact enough for lighter setups", "More resistant to coastal spray"],
    cons: ["Needs rinsing and care after saltwater trips", "Premium sealed reels can get expensive"],
    whyLukaszRecommendsIt:
      "A reel should disappear in your hand and work every time. I would rather see anglers buy one solid 3000 than three cheap reels that grind after the first windy trip.",
    image: "/journal/lukasz-water-setup.jpeg",
    imagePosition: "50% 43%",
    externalLink: "#"
  },
  {
    id: "thin-8-strand-braid",
    name: "Thin 8-strand braid",
    category: "Lines",
    targetFish: ["Sea trout", "Perch", "Pike"],
    useCase: "Long casts, contact with small lures and clean bite detection in wind.",
    priceRange: "Budget",
    beginnerFriendly: true,
    shortDescription: "A simple line upgrade that makes coastal and harbour fishing feel more controlled.",
    pros: ["Better casting distance", "Good lure feedback", "Easy to pair with fluorocarbon leaders"],
    cons: ["Needs careful knots", "Can cut fingers if handled badly under tension"],
    whyLukaszRecommendsIt:
      "Good braid makes a bigger difference than many anglers expect. In Denmark, wind and distance punish weak line choices quickly.",
    image: "/journal/lukasz-platform-selfie.jpeg",
    imagePosition: "52% 42%"
  },
  {
    id: "natural-coastal-spoons",
    name: "Natural coastal spoon set",
    category: "Lures",
    targetFish: ["Sea trout", "Garfish"],
    useCase: "Covering Danish beaches, reefs and fjord points when baitfish are present.",
    priceRange: "Budget",
    beginnerFriendly: true,
    shortDescription: "A small box of natural silver, copper and muted sand colours for sea trout searching.",
    pros: ["Easy to fish while walking", "Covers water quickly", "Works in many coastal conditions"],
    cons: ["Needs colour and weight changes with wind", "Can snag around stones and weed"],
    whyLukaszRecommendsIt:
      "Do not overfill the lure box. A few honest spoons in the right weights teach you more than twenty random colours.",
    image: "/journal/lukasz-marsh-sea-trout.jpeg",
    imagePosition: "50% 46%"
  },
  {
    id: "breathable-waders-belt",
    name: "Breathable waders with safety belt",
    category: "Waders",
    targetFish: ["Sea trout", "Flatfish"],
    useCase: "Coastal mobility, shallow wading and cold Baltic wind windows.",
    priceRange: "Premium",
    beginnerFriendly: false,
    shortDescription: "A safety-first comfort upgrade for serious Danish shore sessions.",
    pros: ["More mobility on varied coast", "Layering works better than neoprene in changing weather", "Safety belt helps reduce risk"],
    cons: ["Not needed for every beginner", "Leaks become expensive if ignored"],
    whyLukaszRecommendsIt:
      "Waders are not a fashion item. They are a tool and a safety decision. Buy them only when you are ready to learn coastal wading properly.",
    image: "/journal/lukasz-rain-session.jpeg",
    imagePosition: "52% 42%"
  },
  {
    id: "windproof-shell-layer",
    name: "Quiet windproof shell layer",
    category: "Clothing",
    targetFish: ["Sea trout", "Pike", "Perch", "Cod", "Flatfish"],
    useCase: "Cold wind, drizzle, ferry travel and long exposed sessions.",
    priceRange: "Mid range",
    beginnerFriendly: true,
    shortDescription: "A practical outer layer that keeps attention on fishing instead of weather discomfort.",
    pros: ["Works over fleece or hoodie", "Useful for both coast and freshwater", "Packs better than bulky jackets"],
    cons: ["Needs proper base layers in winter", "Cheap shells can be noisy and sweaty"],
    whyLukaszRecommendsIt:
      "Danish fishing is often a weather game. A good shell buys patience, and patience catches more fish than panic gear changes.",
    image: "/journal/lukasz-tench-close.jpeg",
    imagePosition: "50% 44%"
  },
  {
    id: "compact-waterproof-sling",
    name: "Compact waterproof sling bag",
    category: "Bags",
    targetFish: ["Sea trout", "Perch", "Garfish"],
    useCase: "Minimal lure boxes, leaders, pliers and snacks during walk-and-cast sessions.",
    priceRange: "Budget",
    beginnerFriendly: true,
    shortDescription: "Enough storage for coastal decisions without dragging the whole garage to the water.",
    pros: ["Encourages mobile fishing", "Keeps essentials close", "Works for short urban sessions"],
    cons: ["Too small for bait fishing", "Needs discipline when packing"],
    whyLukaszRecommendsIt:
      "When anglers carry too much, they stop moving. For Danish coast and harbours, a small bag often means better decisions.",
    image: "/journal/lukasz-bank-selfie.jpeg",
    imagePosition: "50% 42%"
  },
  {
    id: "long-pliers-measure-mat",
    name: "Long pliers, measure tape and wet mat",
    category: "Accessories",
    targetFish: ["Pike", "Sea trout", "Cod", "Perch"],
    useCase: "Safe unhooking, quick measuring and cleaner catch handling.",
    priceRange: "Budget",
    beginnerFriendly: true,
    shortDescription: "Small accessories that make fishing safer, faster and more respectful.",
    pros: ["Protects hands and fish", "Helps with Danish size checks", "Cheap compared with the problems it prevents"],
    cons: ["Easy to forget if not packed together", "Low-quality pliers rust fast"],
    whyLukaszRecommendsIt:
      "This is not optional in my bag. Good handling gear shows respect for the fish and keeps the session calm.",
    image: "/journal/lukasz-pike-river.jpeg",
    imagePosition: "50% 48%"
  },
  {
    id: "danish-coast-map-notebook",
    name: "Danish coast map and trip notebook",
    category: "Books / maps",
    targetFish: ["Sea trout", "Flatfish", "Cod"],
    useCase: "Planning wind-safe alternatives, marking protection zones and recording productive conditions.",
    priceRange: "Budget",
    beginnerFriendly: true,
    shortDescription: "A low-tech habit that makes each Denmark trip more valuable than the last.",
    pros: ["Improves planning over time", "Helps compare wind, season and water clarity", "Works offline"],
    cons: ["Requires consistency", "Maps must be checked against official current rules"],
    whyLukaszRecommendsIt:
      "A notebook turns random trips into learning. For Polish anglers travelling abroad, notes save fuel, time and frustration.",
    image: "/journal/lukasz-team-awards.jpeg",
    imagePosition: "50% 48%"
  }
];

export function getRecommendationById(id: string) {
  return recommendations.find((recommendation) => recommendation.id === id);
}
