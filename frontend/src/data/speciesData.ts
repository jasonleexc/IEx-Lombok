import turtle1 from "@/assets/turtle-1.jpg";
import turtle2 from "@/assets/turtle-2.jpg";
import turtle3 from "@/assets/turtle-3.jpg";
import turtle4 from "@/assets/turtle-4.jpg";

export const speciesPageIntro = {
  title: "Species Guide",
  description:
    "Learn to identify the seven species of sea turtles found in our oceans. Knowing what you are looking at helps make your sighting reports even more valuable.",
};

export const speciesData = [
  {
    name: "Green Sea Turtle",
    scientific: "Chelonia mydas",
    status: "Endangered",
    image: turtle3,
    size: "Up to 150cm, 130-160kg",
    habitat: "Tropical and subtropical shallow waters, seagrass beds, coral reefs",
    diet: "Herbivorous - primarily seagrasses and algae (adults)",
    identifying:
      "Oval carapace with olive-green to dark brown coloring. Single pair of prefrontal scales. Serrated lower jaw.",
    funFact:
      "The only herbivorous sea turtle as adults. Their name comes from the green color of their body fat, not their shell.",
  },
  {
    name: "Hawksbill Turtle",
    scientific: "Eretmochelys imbricata",
    status: "Critically Endangered",
    image: turtle1,
    size: "Up to 90cm, 45-75kg",
    habitat: "Coral reefs, rocky areas, lagoons, and mangrove bays",
    diet: "Sponges, anemones, squid, and shrimp",
    identifying:
      "Narrow, pointed beak (like a hawk). Beautiful overlapping scutes with amber and brown patterns. Serrated shell edge.",
    funFact:
      "They play a critical role in coral reef health by controlling sponge populations that would otherwise outcompete reef-building corals.",
  },
  {
    name: "Loggerhead Turtle",
    scientific: "Caretta caretta",
    status: "Vulnerable",
    image: turtle4,
    size: "Up to 120cm, 80-200kg",
    habitat: "Open ocean, coastal bays, estuaries, and shallow continental shelves",
    diet: "Carnivorous - crabs, mollusks, jellyfish, fish",
    identifying:
      "Distinctively large head with powerful jaws. Reddish-brown carapace, heart-shaped. Five or more costal scutes.",
    funFact:
      "Named for their disproportionately large heads. They can crush heavy-shelled prey like conchs and horseshoe crabs with their powerful jaws.",
  },
  {
    name: "Leatherback Turtle",
    scientific: "Dermochelys coriacea",
    status: "Vulnerable",
    image: turtle2,
    size: "Up to 180cm, 250-700kg",
    habitat: "Open ocean, deep water; widest distribution of all sea turtles",
    diet: "Primarily jellyfish",
    identifying:
      "No hard shell - leathery skin with 7 distinct ridges. Largest sea turtle species. Dark with white or pink spots.",
    funFact:
      "The largest living turtle and the fourth-heaviest reptile. They can dive to depths of over 1,200 meters and regulate body temperature, allowing them to swim in near-arctic waters.",
  },
];
