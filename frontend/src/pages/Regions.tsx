import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight, Waves, Fish, Anchor, TreePalm } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import turtle1 from "@/assets/turtle-1.jpg";
import turtle3 from "@/assets/turtle-3.jpg";
import turtle4 from "@/assets/turtle-4.jpg";
import aboutHero from "@/assets/about-hero.jpg";

type Region = {
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

const regions: Region[] = [
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
      { name: "Gili Trawangan — Turtle Point", type: "Diving / Snorkeling", description: "The most popular turtle viewing spot. Green and hawksbill turtles rest on coral ledges at 8–15m depth. Almost guaranteed sightings year-round." },
      { name: "Gili Meno — Turtle Sanctuary", type: "Snorkeling / Conservation", description: "Shallow seagrass beds where juvenile green turtles feed. The island also hosts a small turtle hatchery and conservation center." },
      { name: "Gili Air — Hans Reef", type: "Diving", description: "A lesser-known dive site with frequent turtle sightings. Hawksbills are often seen feeding on sponges along the wall." },
      { name: "Kuta Beach, South Lombok", type: "Nesting Beach", description: "Pristine beaches where olive ridley and green turtles come ashore to nest between May and October. Local volunteers monitor nests nightly." },
      { name: "Belongas Bay", type: "Diving / Hatchery", description: "Remote bay in south Lombok with a community-run turtle hatchery. Hatchling releases happen regularly during nesting season." },
      { name: "Sekotong Peninsula", type: "Snorkeling", description: "Quiet southwest coast with healthy reefs and regular green turtle encounters. Less crowded than the Gili Islands." },
    ],
    image: aboutHero,
    highlights: [
      "Year-round turtle sightings in the Gili Islands",
      "Community-run hatcheries releasing thousands of hatchlings annually",
      "Nesting season: May – October on southern beaches",
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
    species: ["Green Sea Turtle", "Hawksbill Turtle", "Leatherback Turtle", "Olive Ridley", "Loggerhead Turtle", "Flatback Turtle"],
    sites: [
      { name: "Raja Ampat, Indonesia", type: "Diving", description: "Pristine reefs with regular hawksbill and green turtle sightings." },
      { name: "Sipadan, Malaysia", type: "Diving", description: "World-famous dive site with large green turtle populations." },
      { name: "Apo Island, Philippines", type: "Snorkeling / Diving", description: "Marine sanctuary with healthy turtle populations." },
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
    species: ["Green Sea Turtle", "Hawksbill Turtle", "Leatherback Turtle", "Loggerhead Turtle"],
    sites: [
      { name: "Tortuguero, Costa Rica", type: "Nesting Beach", description: "One of the most important green turtle nesting sites in the Western Hemisphere." },
      { name: "Bonaire", type: "Diving / Snorkeling", description: "Protected waters with thriving hawksbill and green turtle populations." },
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
    species: ["Green Sea Turtle", "Hawksbill Turtle", "Loggerhead Turtle", "Flatback Turtle", "Olive Ridley", "Leatherback Turtle"],
    sites: [
      { name: "Raine Island", type: "Nesting Beach", description: "The world's largest green turtle nesting site — up to 60,000 females nest here each season." },
      { name: "Lady Elliot Island", type: "Diving / Snorkeling", description: "Year-round turtle encounters in gin-clear waters." },
    ],
    image: turtle4,
    highlights: [
      "World's largest green turtle rookery at Raine Island",
      "6 species present in the reef system",
    ],
  },
];

const Regions = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);

  return (
    <div className="container py-10">
      <div className="max-w-3xl mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Regions</h1>
        <p className="text-lg text-muted-foreground">
          Explore sea turtle habitats around the world. Our primary focus is on Lombok, Indonesia, but we're expanding to cover key regions globally.
        </p>
      </div>

      {/* Region Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => setSelectedRegion(region)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              selectedRegion.id === region.id
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-muted"
            }`}
          >
            <MapPin className="h-3.5 w-3.5" />
            {region.name}
            {region.featured && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0">Featured</Badge>
            )}
          </button>
        ))}
      </div>

      {/* Selected Region Detail */}
      <div className="animate-fade-in" key={selectedRegion.id}>
        {/* Hero Banner */}
        <div className="relative h-[250px] md:h-[320px] rounded-xl overflow-hidden mb-8">
          <img
            src={selectedRegion.image}
            alt={selectedRegion.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/40 to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">{selectedRegion.name}</h2>
              {selectedRegion.featured && (
                <Badge className="bg-accent text-accent-foreground border-0">🌟 Primary Focus</Badge>
              )}
            </div>
            <p className="text-primary-foreground/70 text-sm">{selectedRegion.country} · {selectedRegion.sightings.toLocaleString()} sightings reported</p>
          </div>
        </div>

        {/* Description + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <p className="text-foreground leading-relaxed">{selectedRegion.description}</p>

            {/* Species found here */}
            <div className="mt-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">Species Found Here</h3>
              <div className="flex flex-wrap gap-2">
                {selectedRegion.species.map((sp) => (
                  <Badge key={sp} variant="outline" className="text-sm">
                    🐢 {sp}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights sidebar */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">Highlights</h3>
            <ul className="space-y-3">
              {selectedRegion.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Sites */}
        <div className="mb-10">
          <h3 className="font-display text-2xl font-bold text-foreground mb-6">Key Sites</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedRegion.sites.map((site) => (
              <div key={site.name} className="bg-card rounded-lg border border-border p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  {site.type.includes("Diving") && <Waves className="h-4 w-4 text-primary" />}
                  {site.type.includes("Nesting") && <TreePalm className="h-4 w-4 text-accent" />}
                  {site.type.includes("Snorkeling") && <Fish className="h-4 w-4 text-seafoam" />}
                  {site.type.includes("Conservation") && <Anchor className="h-4 w-4 text-coral" />}
                  <Badge variant="secondary" className="text-xs">{site.type}</Badge>
                </div>
                <h4 className="font-semibold text-foreground mb-1">{site.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{site.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-secondary rounded-xl p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-foreground mb-3">
            Spotted a turtle in {selectedRegion.name}?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Your sighting helps us track populations and protect critical habitats in this region.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/submit">Report Your Sighting</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Regions;
