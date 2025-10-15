// Services (URL slugs)
export const SERVICES = [
  { slug: "car-recovery", label: "Car Recovery" },
  { slug: "towing", label: "Towing" },
];

// Locations (URL slugs)
// Add as many as you want — just extend this list.
export const LOCATIONS = [
  { slug: "manchester", label: "Manchester", type: "city" },
  { slug: "bolton", label: "Bolton", type: "city" },
  { slug: "m60", label: "M60", type: "motorway", display: "M60 Motorway" },
];

// Helper: nice display for slugs like "m60"
export const displayLocation = (loc) => loc.display || loc.label;
