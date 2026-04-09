import { Camera, Eye, HandHeart, Lightbulb, ShieldAlert, TreePalm, Trash2, Waves } from "lucide-react";

export type ConservationTipItem = {
  icon: typeof Eye | typeof HandHeart | typeof Camera | typeof Waves | typeof Trash2 | typeof Lightbulb | typeof TreePalm | typeof ShieldAlert;
  title: string;
  description: string;
};

export type EmergencyContact = {
  region: string;
  contact: string;
};

export const interactionGuidelines: ConservationTipItem[] = [
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
      "Turn off flash — it can disorient turtles, especially hatchlings. Approach slowly and let the turtle come to you. Never chase a swimming turtle for a photo.",
  },
  {
    icon: Waves,
    title: "Nesting Beach Behavior",
    description:
      "Keep beaches dark at night during nesting season — no flashlights or phone screens. Don't walk on marked nests. If you see a nesting female, stay behind her and remain silent.",
  },
];

export const conservationActions: ConservationTipItem[] = [
  {
    icon: Trash2,
    title: "Reduce Plastic Pollution",
    description:
      "Sea turtles mistake plastic bags for jellyfish. Use reusable bags, avoid single-use plastics, and participate in beach cleanups.",
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
    description:
      "If you find an injured, entangled, or stranded sea turtle, do not attempt to move it. Contact local wildlife authorities or marine rescue immediately.",
  },
];

export const emergencyContacts: EmergencyContact[] = [
  { region: "United States", contact: "FWC: 1-888-404-FWCC (3922)" },
  { region: "Australia", contact: "1300 ANIMAL (264625)" },
  { region: "Caribbean", contact: "WIDECAST Network — widecast.org" },
  { region: "Mediterranean", contact: "MEDASSET — medasset.org" },
];
