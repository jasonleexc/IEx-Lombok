import aboutHero from "@/assets/about-hero.jpg";
import {
  aboutHeroContent,
  aboutHowItWorks,
  aboutMissionContent,
  aboutTeamContent,
  aboutValues,
} from "@/data/aboutData";

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img src={aboutHero} alt="Sea turtles in turquoise water" className="absolute inset-0 w-full h-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/40 to-transparent" />
        <div className="relative h-full container flex flex-col justify-end pb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">{aboutHeroContent.title}</h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl">
            {aboutHeroContent.description}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-6">{aboutMissionContent.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {aboutMissionContent.description}
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="bg-secondary/50 border-y border-border">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">{aboutTeamContent.title}</h2>
            <p className="text-muted-foreground mb-6">
              {aboutTeamContent.description}
            </p>
            <p className="font-display text-lg font-semibold text-primary">
              {aboutTeamContent.members}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-card border-b border-border">
        <div className="container py-16">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {aboutValues.map((v) => (
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
          {aboutHowItWorks.map((item) => (
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
