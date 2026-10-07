import {
  BookOpen,
  Building,
  Building2,
  Camera,
  Car,
  Castle,
  ChefHat,
  Coffee,
  Columns3,
  Crown,
  DoorOpen,
  Eye,
  Flame,
  Flower2,
  Footprints,
  Gem,
  Hammer,
  HandPlatter,
  Handshake,
  Home,
  Hourglass,
  House,
  Lamp,
  Landmark,
  Leaf,
  Map,
  Milk,
  Mountain,
  Palette,
  PawPrint,
  Ruler,
  Shield,
  Soup,
  Sparkles,
  Store,
  Sunrise,
  Sunset,
  Telescope,
  Trees,
  Trophy,
  Users,
  UtensilsCrossed,
  Waves,
  Wheat,
} from "lucide-react";

// Maps the icon names stored in experiences.js (e.g. icon: "Sunrise")
// to Lucide icon components. Add a name here when you use a new icon.
const ICONS = {
  BookOpen,
  Building,
  Building2,
  Camera,
  Car,
  Castle,
  ChefHat,
  Coffee,
  Columns3,
  Crown,
  DoorOpen,
  Eye,
  Flame,
  Flower2,
  Footprints,
  Gem,
  Hammer,
  HandPlatter,
  Handshake,
  Home,
  Hourglass,
  House,
  Lamp,
  Landmark,
  Leaf,
  Map,
  Milk,
  Mountain,
  Palette,
  PawPrint,
  Ruler,
  Shield,
  Soup,
  Sparkles,
  Store,
  Sunrise,
  Sunset,
  Telescope,
  Trees,
  Trophy,
  Users,
  UtensilsCrossed,
  Waves,
  Wheat,
};

export default function HighlightIcon({ name, size = 20, className = "", ...props }) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return (
    <Icon
      size={size}
      strokeWidth={1.5}
      className={className}
      aria-hidden="true"
      {...props}
    />
  );
}