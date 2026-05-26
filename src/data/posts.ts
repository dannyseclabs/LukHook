export type PostCategory =
  | "Danish fishing guides"
  | "Sea trout tactics"
  | "Gear notes"
  | "Trip reports"
  | "Regulations"
  | "Polish angler tips"
  | "Photo journal";

export type PostSection = {
  heading: string;
  body: string[];
};

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: PostCategory;
  region: string;
  targetFish: string[];
  readingTime: string;
  coverImage: string;
  coverPosition?: string;
  content: PostSection[];
};

export const postCategories: PostCategory[] = [
  "Danish fishing guides",
  "Sea trout tactics",
  "Gear notes",
  "Trip reports",
  "Regulations",
  "Polish angler tips",
  "Photo journal"
];

// TODO backend: replace local posts with database or CMS queries.
// TODO backend: add admin page for creating posts, image upload, draft/publish status and Łukasz-only authentication.
// Future options: Supabase for a custom database/admin panel, or Sanity for rich text editing and easier editorial workflow.
export const posts: JournalPost[] = [
  {
    slug: "first-sea-trout-trip-in-denmark",
    title: "First sea trout trip in Denmark — what Polish anglers should know",
    excerpt: "A practical first-trip checklist for Polish anglers driving north for Danish coastal sea trout.",
    date: "2026-02-18",
    author: "Łukasz Wojciechowski",
    category: "Danish fishing guides",
    region: "Funen",
    targetFish: ["Sea trout"],
    readingTime: "7 min read",
    coverImage: "/journal/lukasz-harbour-trout.jpeg",
    coverPosition: "50% 44%",
    content: [
      {
        heading: "Start with wind, not with a famous spot",
        body: [
          "The biggest mistake on a first Danish sea trout trip is chasing names from the internet instead of reading the wind. A good coast with manageable wind is better than a famous coast that is unfishable.",
          "Before leaving Poland, prepare three alternatives for every day: one open coast, one sheltered fjord side and one harbour or pier backup."
        ]
      },
      {
        heading: "Keep the setup simple",
        body: [
          "A 2.7-3.0 m rod, a solid 2500-3000 reel, thin braid and a small box of natural spoons will cover most beginner situations.",
          "The real skill is not owning more lures. It is walking, observing weed, stones, current and water clarity, then moving when the water feels dead."
        ]
      },
      {
        heading: "Legal checks are part of the trip",
        body: [
          "Always check fishing licence rules, minimum sizes, stream-mouth protection zones and seasonal restrictions before fishing. Danish water is accessible, but it is not rule-free.",
          "Treat official sources as the final decision, especially around sea trout and cod."
        ]
      }
    ]
  },
  {
    slug: "choose-coastal-water-for-sea-trout",
    title: "How to choose coastal water for sea trout",
    excerpt: "Reading Danish coastlines through wind, structure, water colour and small signs of life.",
    date: "2026-03-04",
    author: "Łukasz Wojciechowski",
    category: "Sea trout tactics",
    region: "Zealand",
    targetFish: ["Sea trout"],
    readingTime: "6 min read",
    coverImage: "/journal/lukasz-marsh-sea-trout.jpeg",
    coverPosition: "50% 46%",
    content: [
      {
        heading: "Look for mixed bottom",
        body: [
          "Sea trout water often has variety: sand, stones, eelgrass, small depth changes and current. If everything looks identical for hundreds of metres, keep walking until the coast gives you a reason.",
          "In clear water, fish the near structure before stepping into it. Many fish are closer than beginners expect."
        ]
      },
      {
        heading: "Water colour matters",
        body: [
          "Completely clear water can be difficult in hard sun. Slight colour from wind or current can make fish braver and your lure less suspicious.",
          "Dirty water is not automatically bad, but if the lure disappears instantly, move to a cleaner edge."
        ]
      },
      {
        heading: "Make small tests quickly",
        body: [
          "Fish a stretch with different angles and speeds, then move. Danish coastal fishing rewards motion and honest observation more than stubbornness.",
          "Write down wind direction, water colour and lure choice after good contacts. Patterns build over trips."
        ]
      }
    ]
  },
  {
    slug: "beginner-gear-setup-danish-coast",
    title: "Beginner gear setup for Danish coastal fishing",
    excerpt: "A simple metric setup for Polish anglers who want to fish Danish coast without overbuying.",
    date: "2026-03-21",
    author: "Łukasz Wojciechowski",
    category: "Gear notes",
    region: "East Jutland",
    targetFish: ["Sea trout", "Flatfish", "Garfish"],
    readingTime: "5 min read",
    coverImage: "/journal/lukasz-water-setup.jpeg",
    coverPosition: "50% 42%",
    content: [
      {
        heading: "One spinning outfit can do a lot",
        body: [
          "For the first trip, choose a 2.7-3.0 m spinning rod and a 2500-3000 reel. This covers spoons, slim wobblers, bombarda rigs and many harbour situations.",
          "Do not start with the most expensive specialist rod. Start with something balanced and learn where your fishing actually goes."
        ]
      },
      {
        heading: "Pack leaders and pliers",
        body: [
          "Thin braid needs a leader. Bring fluorocarbon in a sensible diameter and learn reliable knots before the trip.",
          "Long pliers, a small measure tape and a safe release routine are part of the setup, not optional extras."
        ]
      },
      {
        heading: "Clothing catches fish indirectly",
        body: [
          "Good layers keep you fishing for two more hours when wind turns cold. That patience is often the difference between a blank and a memory.",
          "A windproof shell and warm base layer are more useful than another random lure colour."
        ]
      }
    ]
  },
  {
    slug: "common-mistakes-polish-anglers-denmark",
    title: "Common mistakes Polish anglers make in Denmark",
    excerpt: "The practical habits that cost time, fuel and fish during Danish fishing trips.",
    date: "2026-04-09",
    author: "Łukasz Wojciechowski",
    category: "Polish angler tips",
    region: "North Jutland",
    targetFish: ["Sea trout", "Pike", "Perch", "Cod"],
    readingTime: "8 min read",
    coverImage: "/journal/lukasz-bank-selfie.jpeg",
    coverPosition: "50% 42%",
    content: [
      {
        heading: "Driving too much, fishing too little",
        body: [
          "Danish maps tempt anglers to chase every spot in one weekend. That usually means more road than fishing.",
          "Choose a region, prepare wind alternatives and give each good water a fair but disciplined chance."
        ]
      },
      {
        heading: "Ignoring local access culture",
        body: [
          "Parking, private land, harbour signs and nature areas matter. Being respectful keeps access open for everyone.",
          "If something feels unclear, choose another place. A good trip does not need conflict."
        ]
      },
      {
        heading: "Treating regulations as a last-minute detail",
        body: [
          "Rules change, especially around sensitive species and areas. Check them before packing, then again before fishing.",
          "A legal plan is calmer, and calm anglers make better decisions."
        ]
      }
    ]
  },
  {
    slug: "what-to-check-before-fishing-in-denmark",
    title: "What to check before fishing in Denmark",
    excerpt: "A sober pre-trip checklist for licences, weather, protected zones and local water rules.",
    date: "2026-04-28",
    author: "Łukasz Wojciechowski",
    category: "Regulations",
    region: "Copenhagen area",
    targetFish: ["Sea trout", "Cod", "Pike", "Flatfish", "Perch"],
    readingTime: "6 min read",
    coverImage: "/journal/lukasz-rain-session.jpeg",
    coverPosition: "52% 42%",
    content: [
      {
        heading: "Licence first",
        body: [
          "Check whether you need the national Danish fishing licence for your planned water and method. Do this before the trip, not beside the car in bad signal.",
          "Put proof somewhere easy to access on your phone."
        ]
      },
      {
        heading: "Species and zones",
        body: [
          "Minimum sizes, closed seasons and protected stream-mouth zones can decide whether a place is fishable.",
          "Use official sources for final decisions. Blog posts and social media should only point you toward what to verify."
        ]
      },
      {
        heading: "Weather and safety",
        body: [
          "Wind direction, swell, cold water and slippery rocks matter as much as lure choice. If a coast looks dangerous, move.",
          "A good Denmark trip is one you can repeat."
        ]
      }
    ]
  }
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
