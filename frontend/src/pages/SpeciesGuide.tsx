import { Badge } from "@/components/ui/badge";
import turtle1 from "@/assets/turtle-1.jpg";
import turtle2 from "@/assets/turtle-2.jpg";
import turtle3 from "@/assets/turtle-3.jpg";
import turtle4 from "@/assets/turtle-4.jpg";

const speciesData = [
  {
    name: "Green Sea Turtle",
    scientific: "Chelonia mydas",
    status: "Endangered",
    image: turtle3,
    size: "Up to 150cm, 130–160kg",
    habitat: "Tropical and subtropical shallow waters, seagrass beds, coral reefs",
    diet: "Herbivorous — primarily seagrasses and algae (adults)",
    identifying: "Oval carapace with olive-green to dark brown coloring. Single pair of prefrontal scales. Serrated lower jaw.",
    funFact: "The only herbivorous sea turtle as adults. Their name comes from the green color of their body fat, not their shell.",
  },
  {
    name: "Hawksbill Turtle",
    scientific: "Eretmochelys imbricata",
    status: "Critically Endangered",
    image: turtle1,
    size: "Up to 90cm, 45–75kg",
    habitat: "Coral reefs, rocky areas, lagoons, and mangrove bays",
    diet: "Sponges, anemones, squid, and shrimp",
    identifying: "Narrow, pointed beak (like a hawk). Beautiful overlapping scutes with amber and brown patterns. Serrated shell edge.",
    funFact: "They play a critical role in coral reef health by controlling sponge populations that would otherwise outcompete reef-building corals.",
  },
  {
    name: "Loggerhead Turtle",
    scientific: "Caretta caretta",
    status: "Vulnerable",
    image: turtle4,
    size: "Up to 120cm, 80–200kg",
    habitat: "Open ocean, coastal bays, estuaries, and shallow continental shelves",
    diet: "Carnivorous — crabs, mollusks, jellyfish, fish",
    identifying: "Distinctively large head with powerful jaws. Reddish-brown carapace, heart-shaped. Five or more costal scutes.",
    funFact: "Named for their disproportionately large heads. They can crush heavy-shelled prey like conchs and horseshoe crabs with their powerful jaws.",
  },
  {
    name: "Leatherback Turtle",
    scientific: "Dermochelys coriacea",
    status: "Vulnerable",
    image: turtle2,
    size: "Up to 180cm, 250–700kg",
    habitat: "Open ocean, deep water; widest distribution of all sea turtles",
    diet: "Primarily jellyfish",
    identifying: "No hard shell — leathery skin with 7 distinct ridges. Largest sea turtle species. Dark with white or pink spots.",
    funFact: "The largest living turtle and the fourth-heaviest reptile. They can dive to depths of over 1,200 meters and regulate body temperature, allowing them to swim in near-arctic waters.",
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Critically Endangered": return "bg-destructive text-destructive-foreground";
    case "Endangered": return "bg-coral text-accent-foreground";
    case "Vulnerable": return "bg-amber-500 text-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const SpeciesGuide = () => {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Species Guide</h1>
        <p className="text-lg text-muted-foreground">
          Learn to identify the seven species of sea turtles found in our oceans. Knowing what you're looking at helps make your sighting reports even more valuable.
        </p>
      </div>

      <div className="space-y-8">
        {speciesData.map((sp, i) => (
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
