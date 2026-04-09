import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight, Waves, Fish, Anchor, TreePalm } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { regions, type RegionInfo } from "@/data/regionsData";

const Regions = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionInfo>(regions[0]);

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
