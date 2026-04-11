import { Camera, Eye, HandHeart, Lightbulb, ShieldAlert, Trash2, TreePalm, Waves } from "lucide-react";

export const conservationPageIntro = {
  title: "Conservation Tips",
  description:
    "How to responsibly interact with sea turtles, contribute to their protection, and what to do in an emergency.",
};

export const interactionGuidelines = [
  {
    icon: Eye,
    title: "Observe from a Distance",
    description:
      "Stay at least 3 meters (10 feet) away from sea turtles in the water. On land, maintain at least 6 meters (20 feet). Use binoculars or a zoom lens for a closer look.",
  },
  {
    icon: HandHeart,
    title: "Never Touch or Ride",
    description:
      "Touching turtles can stress them, damage their shells, and transfer harmful bacteria in both directions. Never attempt to ride, grab, or restrict their movement.",
  },
  {
    icon: Camera,
    title: "Photography Tips",
    description:
      "Turn off flash - it can disorient turtles, especially hatchlings. Approach slowly and let the turtle come to you. Never chase a swimming turtle for a photo.",
  },
  {
    icon: Waves,
    title: "Nesting Beach Behavior",
    description:
      "Keep beaches dark at night during nesting season - no flashlights or phone screens. Do not walk on marked nests. If you see a nesting female, stay behind her and remain silent.",
  },
];

export const conservationActions = [
  {
    icon: Trash2,
    title: "Reduce Plastic Pollution",
    description:
      "Sea turtles mistake plastic bags for jellyfish. Use reusable bags, avoid single-use plastics, and participate in beach cleanups.",
  },
  {
    icon: Lightbulb,
    title: "Support Light Management",
    description:
      "Artificial lights near nesting beaches disorient hatchlings. Advocate for turtle-safe lighting in coastal communities.",
  },
  {
    icon: TreePalm,
    title: "Protect Coastal Habitats",
    description:
      "Support mangrove restoration, seagrass conservation, and coral reef protection - these are critical sea turtle habitats.",
  },
  {
    icon: ShieldAlert,
    title: "Report Injured Turtles",
    description:
      "If you find an injured, entangled, or stranded sea turtle, do not attempt to move it. Contact local wildlife authorities or marine rescue immediately.",
  },
];

export const emergencyContacts = [
  { region: "United States", contact: "FWC: 1-888-404-FWCC (3922)" },
  { region: "Australia", contact: "1300 ANIMAL (264625)" },
  { region: "Caribbean", contact: "WIDECAST Network - widecast.org" },
  { region: "Mediterranean", contact: "MEDASSET - medasset.org" },
];
