import { Link } from "react-router-dom";
import { Plus, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import SightingCard from "@/components/SightingCard";
import { homeHero, homeStats, mockSightings } from "@/data/indexData";

const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={homeHero.image}
          alt={homeHero.alt}
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/50 to-transparent" />
        <div className="relative h-full container flex flex-col justify-end pb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 max-w-2xl">
            {homeHero.title}
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mb-6">
            {homeHero.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/submit">
                <Plus className="h-4 w-4 mr-2" />
                Report a Sighting
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-seafoam text-ocean-deep hover:bg-seafoam/80 border-0">
              <Link to="/species">Explore Species</Link>
            </Button>
            <Button asChild size="lg" className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25 border border-primary-foreground/40">
              <Link to="/regions">
                <MapPin className="h-4 w-4 mr-2" />
                Lombok Region
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-b border-border">
        <div className="container py-6">
          <div className="grid grid-cols-3 gap-4">
            {homeStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-primary" />
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                </div>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sightings Feed */}
      <section className="container py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Recent Sightings</h2>
            <p className="text-muted-foreground mt-1">Latest reports from the Lombok region & beyond</p>
          </div>
          <Button asChild variant="outline" className="hidden sm:flex">
            <Link to="/submit">
              <Plus className="h-4 w-4 mr-2" />
              Add Yours
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockSightings.map((sighting, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <SightingCard {...sighting} />
            </div>
          ))}
        </div>

        {/* Mobile FAB */}
        <Link
          to="/submit"
          className="fixed bottom-6 right-6 md:hidden bg-accent text-accent-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40"
        >
          <Plus className="h-6 w-6" />
        </Link>
      </section>
    </div>
  );
};

export default Index;
