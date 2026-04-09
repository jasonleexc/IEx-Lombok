import { conservationActions, emergencyContacts, interactionGuidelines } from "@/data/conservationTipsData";

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
