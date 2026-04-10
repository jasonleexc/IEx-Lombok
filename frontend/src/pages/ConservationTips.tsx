import { Eye, HandHeart, Lightbulb, ShieldAlert, Waves, Camera, TreePalm, Trash2 } from "lucide-react";

const interactionGuidelines = [
  {
    icon: Eye,
    title: "Observe from a Distance",
    description: "Stay at least 3 meters (10 feet) away from sea turtles in the water. On land, maintain at least 6 meters (20 feet). Use binoculars or a zoom lens for a closer look.",
  },
  {
    icon: HandHeart,
    title: "Never Touch or Ride",
    description: "Touching turtles can stress them, damage their shells, and transfer harmful bacteria in both directions. Never attempt to ride, grab, or restrict their movement.",
  },
  {
    icon: Camera,
    title: "Photography Tips",
    description: "Turn off flash — it can disorient turtles, especially hatchlings. Approach slowly and let the turtle come to you. Never chase a swimming turtle for a photo.",
  },
  {
    icon: Waves,
    title: "Nesting Beach Behavior",
    description: "Keep beaches dark at night during nesting season — no flashlights or phone screens. Don't walk on marked nests. If you see a nesting female, stay behind her and remain silent.",
  },
];

const conservationActions = [
  {
    icon: Trash2,
    title: "Reduce Plastic Pollution",
    description: "Sea turtles mistake plastic bags for jellyfish. Use reusable bags, avoid single-use plastics, and participate in beach cleanups.",
  },
  {
    icon: Lightbulb,
    title: "Support Light Management",
    description: "Artificial lights near nesting beaches disorient hatchlings. Advocate for turtle-safe lighting in coastal communities.",
  },
  {
    icon: TreePalm,
    title: "Protect Coastal Habitats",
    description: "Support mangrove restoration, seagrass conservation, and coral reef protection — these are critical sea turtle habitats.",
  },
  {
    icon: ShieldAlert,
    title: "Report Injured Turtles",
    description: "If you find an injured, entangled, or stranded sea turtle, do not attempt to move it. Contact local wildlife authorities or marine rescue immediately.",
  },
];

const emergencyContacts = [
  { region: "United States", contact: "FWC: 1-888-404-FWCC (3922)" },
  { region: "Australia", contact: "1300 ANIMAL (264625)" },
  { region: "Caribbean", contact: "WIDECAST Network — widecast.org" },
  { region: "Mediterranean", contact: "MEDASSET — medasset.org" },
];

const ConservationTips = () => {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Conservation Tips</h1>
        <p className="text-lg text-muted-foreground">
          How to responsibly interact with sea turtles, contribute to their protection, and what to do in an emergency.
        </p>
      </div>

      {/* Interaction Guidelines */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">How to Interact Responsibly</h2>
        <p className="text-muted-foreground mb-8">Follow these guidelines to ensure your encounters are safe for both you and the turtles.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interactionGuidelines.map((item) => (
            <div key={item.title} className="bg-card rounded-lg border border-border p-6 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conservation Actions */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">How You Can Help</h2>
        <p className="text-muted-foreground mb-8">Everyday actions that make a real difference for sea turtle survival.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {conservationActions.map((item) => (
            <div key={item.title} className="bg-card rounded-lg border border-border p-6 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency */}
      <section className="bg-card rounded-lg border border-border p-8">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">🚨 Found an Injured Turtle?</h2>
        <p className="text-muted-foreground mb-6">
          Do not move the turtle. Keep people and pets away. Note the location and contact your local marine rescue hotline:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {emergencyContacts.map((c) => (
            <div key={c.region} className="bg-secondary rounded-lg p-4">
              <p className="font-semibold text-sm text-foreground">{c.region}</p>
              <p className="text-sm text-muted-foreground">{c.contact}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ConservationTips;
