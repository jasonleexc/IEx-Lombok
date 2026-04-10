import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Shell } from "lucide-react";

const navItems = [
  { path: "/", label: "Sightings" },
  { path: "/submit", label: "Report Sighting" },
  { path: "/species", label: "Species Guide" },
  { path: "/regions", label: "Regions" },
  { path: "/tips", label: "Conservation Tips" },
  { path: "/about", label: "About" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    // top nav-bar
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-ocean-deep/95 backdrop-blur-sm border-b border-primary/20">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-primary-foreground">
            <Shell className="h-7 w-7 text-seafoam" />
            <span className="font-display text-xl font-semibold tracking-tight">Shell-utions</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary/20"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden bg-ocean-deep border-t border-primary/20 px-4 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-ocean-deep text-primary-foreground/70 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shell className="h-5 w-5 text-seafoam" />
                <span className="font-display text-lg font-semibold text-primary-foreground">Shell-utions</span>
              </div>
              <p className="text-sm leading-relaxed">
                Community-driven sea turtle conservation through citizen science and shared sightings.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-primary-foreground mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} className="hover:text-seafoam transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-primary-foreground mb-3">Stay Connected</h4>
              <p className="text-sm leading-relaxed">
                Every sighting matters. Join thousands of ocean advocates helping to protect sea turtles worldwide.
              </p>
            </div>
          </div>
          <div className="border-t border-primary/20 mt-8 pt-6 text-center text-xs">
            © 2026 Shell-utions. Protecting sea turtles, one sighting at a time.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
