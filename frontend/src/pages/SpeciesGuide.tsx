import { Badge } from "@/components/ui/badge";
import { dataService } from "@/services/dataService";
import { useState, useEffect } from "react";
import type { SpeciesInfo } from "@/services/dataService";

const statusColor = (status: SpeciesInfo["status"]) => {
  switch (status) {
    case "Critically Endangered": return "bg-destructive text-destructive-foreground";
    case "Endangered": return "bg-coral text-accent-foreground";
    case "Vulnerable": return "bg-amber-500 text-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const SpeciesGuide = () => {
  const [species, setSpecies] = useState<SpeciesInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const speciesData = await dataService.getSpecies();
        setSpecies(speciesData);
      } catch (error) {
        console.error('Error loading species data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading species data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Species Guide</h1>
        <p className="text-lg text-muted-foreground">
          Learn to identify the seven species of sea turtles found in our oceans. Knowing what you're looking at helps make your sighting reports even more valuable.
        </p>
      </div>

      <div className="space-y-8">
        {species.map((sp, i) => (
          <article
            key={sp.name}
            className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[320px_1fr]">
              <div className="aspect-square md:aspect-auto overflow-hidden">
                <img src={sp.image} alt={sp.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h2 className="font-display text-2xl font-bold text-foreground">{sp.name}</h2>
                  <Badge className={`${statusColor(sp.status)} border-0`}>{sp.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground italic mb-4">{sp.scientific}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Size</h4>
                    <p className="text-muted-foreground">{sp.size}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Habitat</h4>
                    <p className="text-muted-foreground">{sp.habitat}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Diet</h4>
                    <p className="text-muted-foreground">{sp.diet}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">How to Identify</h4>
                    <p className="text-muted-foreground">{sp.identifying}</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-secondary rounded-lg">
                  <p className="text-sm text-secondary-foreground">
                    <span className="font-semibold">💡 Fun Fact:</span> {sp.funFact}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SpeciesGuide;
