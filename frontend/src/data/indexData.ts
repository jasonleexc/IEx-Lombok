import { Eye, MapPin, Users } from "lucide-react";
import heroImage from "@/assets/hero-turtle.jpg";
import turtle1 from "@/assets/turtle-1.jpg";
import turtle2 from "@/assets/turtle-2.jpg";
import turtle3 from "@/assets/turtle-3.jpg";
import turtle4 from "@/assets/turtle-4.jpg";

export const homeHero = {
  image: heroImage,
  alt: "Sea turtle swimming through coral reef",
  title: "Every Sighting Tells a Story",
  description:
    "Join our community tracking and protecting sea turtles - starting from the waters of Lombok, Indonesia.",
};

export const mockSightings = [
  {
    author: "Wayan Surya",
    avatar: "WS",
    image: turtle1,
    species: "Hawksbill Turtle",
    location: "Gili Trawangan, Lombok",
    date: "April 5, 2026",
    description:
      "Spotted this beautiful hawksbill feeding on sponges near the famous turtle point dive site! She was very calm and let us observe from about 4 meters. The reef here is thriving.",
    likes: 142,
    comments: 23,
    size: "~70cm carapace",
    behavior: "Feeding on sponges",
  },
  {
    author: "Ayu Lestari",
    avatar: "AL",
    image: turtle3,
    species: "Green Sea Turtle",
    location: "Gili Meno, Lombok",
    date: "April 3, 2026",
    description:
      "Green turtle grazing on seagrass in the shallow waters of Gili Meno. This area is such an important feeding ground - we counted 4 turtles in just one snorkel session!",
    likes: 189,
    comments: 31,
    size: "~90cm carapace",
    behavior: "Grazing on seagrass",
  },
  {
    author: "James Okafor",
    avatar: "JO",
    image: turtle2,
    species: "Olive Ridley",
    location: "Kuta Beach, South Lombok",
    date: "March 30, 2026",
    description:
      "Witnessed an arriving female at sunset during the nesting season on the pristine beaches of South Lombok. The local conservation team was monitoring the area. Truly humbling.",
    likes: 231,
    comments: 47,
    size: "~65cm carapace",
    behavior: "Nesting",
  },
  {
    author: "Sophie Chen",
    avatar: "SC",
    image: turtle4,
    species: "Green Turtle Hatchlings",
    location: "Belongas Bay, Lombok",
    date: "March 27, 2026",
    description:
      "Magical hatchling release organized by the local turtle conservation center! Over 50 baby green turtles made their way to the ocean at dawn. The community effort here is incredible.",
    likes: 412,
    comments: 89,
    size: "~5cm each",
    behavior: "Hatching & ocean entry",
  },
];

export const homeStats = [
  { icon: Eye, value: "12,847", label: "Total Sightings" },
  { icon: Users, value: "3,291", label: "Contributors" },
  { icon: MapPin, value: "Lombok", label: "Featured Region" },
];
