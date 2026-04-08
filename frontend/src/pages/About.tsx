import { Heart, Globe, Users, Shield } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";

const values = [
  {
    icon: Globe,
    title: "Citizen Science",
    description: "Every sighting you report contributes to real scientific research on sea turtle populations, migration, and habitat use.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description: "Our global network of divers, snorkelers, beachgoers, and researchers work together to create the most comprehensive sea turtle database.",
  },
  {
    icon: Shield,
    title: "Conservation First",
    description: "Data collected through Shell-utions directly informs conservation policy, protected area management, and species recovery programs.",
  },
  {
    icon: Heart,
    title: "Respect & Responsibility",
    description: "We promote responsible wildlife interaction — observe from a distance, never disturb nesting turtles, and always report injuries.",
  },
];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img src={aboutHero} alt="Sea turtles in turquoise water" className="absolute inset-0 w-full h-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/40 to-transparent" />
        <div className="relative h-full container flex flex-col justify-end pb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">About Shell-utions</h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl">
            A citizen science platform dedicated to sea turtle conservation through community-reported sightings.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Shell-utions empowers everyday ocean lovers to contribute to sea turtle conservation, with a special focus 
            on the waters around Lombok, Indonesia. By recording and sharing sightings, our community builds a living map 
            of sea turtle activity — helping researchers identify critical habitats, track population trends, and respond 
            to threats in real time. Whether you're a seasoned marine biologist or a first-time snorkeler, your observation matters.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="bg-secondary/50 border-y border-border">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Team</h2>
            <p className="text-muted-foreground mb-6">
              Shell-utions is built with passion for marine conservation and a shared love of the ocean.
            </p>
            <p className="font-display text-lg font-semibold text-primary">
              By Jason, Dean, Dowon, Yutong, Shanti & Ebelle
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-card border-b border-border">
        <div className="container py-16">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-16">
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: "01", title: "Spot a Turtle", desc: "Encounter a sea turtle while diving, snorkeling, or walking the beach." },
            { step: "02", title: "Report It", desc: "Submit details — species, location, behavior, photos — through our simple form." },
            { step: "03", title: "Make an Impact", desc: "Your data joins a global database used by researchers and conservationists." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-14 h-14 rounded-full bg-secondary text-foreground font-display text-xl font-bold flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
