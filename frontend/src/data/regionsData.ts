import aboutHero from "@/assets/about-hero.jpg";
import turtle1 from "@/assets/turtle-1.jpg";
import turtle3 from "@/assets/turtle-3.jpg";
import turtle4 from "@/assets/turtle-4.jpg";

export type Region = {
  id: string;
  name: string;
  country: string;
  description: string;
  featured: boolean;
  sightings: number;
  species: string[];
  sites: { name: string; type: string; description: string }[];
  image: string;
  highlights: string[];
};

export const regionsPageIntro = {
  title: "Regions",
  description:
    "Explore sea turtle habitats around the world. Our primary focus is on Lombok, Indonesia, but we are expanding to cover key regions globally.",
};

export const regions: Region[] = [
  {
    id: "lombok",
    name: "Lombok",
    country: "Indonesia",
    description:
      "Lombok and the surrounding Gili Islands are one of Southeast Asia's most important sea turtle habitats. The crystal-clear waters around Gili Trawangan, Gili Meno, and Gili Air are famous for year-round turtle encounters, while the southern beaches of Lombok host vital nesting sites for green and hawksbill turtles.",
    featured: true,
    sightings: 4821,
    species: ["Green Sea Turtle", "Hawksbill Turtle", "Olive Ridley"],
    sites: [
      {
        name: "Gili Trawangan - Turtle Point",
        type: "Diving / Snorkeling",
        description:
          "The most popular turtle viewing spot. Green and hawksbill turtles rest on coral ledges at 8-15m depth. Almost guaranteed sightings year-round.",
      },
      {
        name: "Gili Meno - Turtle Sanctuary",
        type: "Snorkeling / Conservation",
        description:
          "Shallow seagrass beds where juvenile green turtles feed. The island also hosts a small turtle hatchery and conservation center.",
      },
      {
        name: "Gili Air - Hans Reef",
        type: "Diving",
        description:
          "A lesser-known dive site with frequent turtle sightings. Hawksbills are often seen feeding on sponges along the wall.",
      },
      {
        name: "Kuta Beach, South Lombok",
        type: "Nesting Beach",
        description:
          "Pristine beaches where olive ridley and green turtles come ashore to nest between May and October. Local volunteers monitor nests nightly.",
      },
      {
        name: "Belongas Bay",
        type: "Diving / Hatchery",
        description:
          "Remote bay in south Lombok with a community-run turtle hatchery. Hatchling releases happen regularly during nesting season.",
      },
      {
        name: "Sekotong Peninsula",
        type: "Snorkeling",
        description:
          "Quiet southwest coast with healthy reefs and regular green turtle encounters. Less crowded than the Gili Islands.",
      },
    ],
    image: aboutHero,
    highlights: [
      "Year-round turtle sightings in the Gili Islands",
      "Community-run hatcheries releasing thousands of hatchlings annually",
      "Nesting season: May - October on southern beaches",
      "3 species commonly sighted in the region",
      "Growing eco-tourism supporting local conservation efforts",
    ],
  },
  {
    id: "coral-triangle",
    name: "Coral Triangle",
    country: "Southeast Asia",
    description:
      "The Coral Triangle spans Indonesia, Malaysia, Philippines, Papua New Guinea, Solomon Islands, and Timor-Leste. It's the global epicenter of marine biodiversity and home to 6 of the world's 7 sea turtle species.",
    featured: false,
    sightings: 3412,
    species: [
      "Green Sea Turtle",
      "Hawksbill Turtle",
      "Leatherback Turtle",
      "Olive Ridley",
      "Loggerhead Turtle",
      "Flatback Turtle",
    ],
    sites: [
      {
        name: "Raja Ampat, Indonesia",
        type: "Diving",
        description: "Pristine reefs with regular hawksbill and green turtle sightings.",
      },
      {
        name: "Sipadan, Malaysia",
        type: "Diving",
        description: "World-famous dive site with large green turtle populations.",
      },
      {
        name: "Apo Island, Philippines",
        type: "Snorkeling / Diving",
        description: "Marine sanctuary with healthy turtle populations.",
      },
    ],
    image: turtle3,
    highlights: [
      "Home to 6 of 7 sea turtle species",
      "The most biodiverse marine region on Earth",
      "Numerous marine protected areas",
    ],
  },
  {
    id: "caribbean",
    name: "Caribbean",
    country: "Multiple Nations",
    description:
      "The Caribbean Sea is critical habitat for green, hawksbill, leatherback, and loggerhead turtles. Major nesting beaches are found from Costa Rica to Barbados.",
    featured: false,
    sightings: 2134,
    species: [
      "Green Sea Turtle",
      "Hawksbill Turtle",
      "Leatherback Turtle",
      "Loggerhead Turtle",
    ],
    sites: [
      {
        name: "Tortuguero, Costa Rica",
        type: "Nesting Beach",
        description:
          "One of the most important green turtle nesting sites in the Western Hemisphere.",
      },
      {
        name: "Bonaire",
        type: "Diving / Snorkeling",
        description:
          "Protected waters with thriving hawksbill and green turtle populations.",
      },
    ],
    image: turtle1,
    highlights: [
      "Critical nesting habitat for multiple species",
      "Strong regional conservation networks (WIDECAST)",
    ],
  },
  {
    id: "great-barrier-reef",
    name: "Great Barrier Reef",
    country: "Australia",
    description:
      "The Great Barrier Reef supports 6 sea turtle species and contains some of the largest green turtle nesting sites in the world, particularly on Raine Island.",
    featured: false,
    sightings: 1876,
    species: [
      "Green Sea Turtle",
      "Hawksbill Turtle",
      "Loggerhead Turtle",
      "Flatback Turtle",
      "Olive Ridley",
      "Leatherback Turtle",
    ],
    sites: [
      {
        name: "Raine Island",
        type: "Nesting Beach",
        description:
          "The world's largest green turtle nesting site - up to 60,000 females nest here each season.",
      },
      {
        name: "Lady Elliot Island",
        type: "Diving / Snorkeling",
        description: "Year-round turtle encounters in gin-clear waters.",
      },
    ],
    image: turtle4,
    highlights: [
      "World's largest green turtle rookery at Raine Island",
      "6 species present in the reef system",
    ],
  },
];
