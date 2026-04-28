"use client";

import CategoriesSection from "@/components/blocks/v2/categories-section";
import { Plug, Zap, Lightbulb, Network, Battery, Bell, Wind, Package, Layers } from "lucide-react";

const SLUG_META = {
  "switches-outlets":  { icon: Plug,      description: "British & Italian standard wiring devices across Bravo, Glasskin, Roman & more series" },
  "circuit-protection":{ icon: Zap,       description: "MCB, MCCB, RCCB, CAM changeover switches & distribution boards" },
  "lighting":          { icon: Lightbulb, description: "COB downlights, surface panels, flood lights, step lights & sensors" },
  "cable-management":  { icon: Network,   description: "PVC trunking, conduit, junction boxes & concealment accessories" },
  "power-workspace":   { icon: Battery,   description: "Extension leads with USB-C, floor boxes & motorised desk pop-ups" },
  "doorbells":         { icon: Bell,      description: "Wired & wireless doorbell systems with chime options" },
  "fans":              { icon: Wind,      description: "Ceiling fans & air purification units for every room" },
  "accessories":       { icon: Package,   description: "IP66 covers, travel adapters, capacitors & safety accessories" },
};

const STATIC_CATEGORIES = [
  { icon: Plug,      name: "Switches & Outlets",  description: "British & Italian standard wiring devices across Bravo, Glasskin, Roman & more series", count: "200+ products", href: "/aqua-electrical/switches-outlets" },
  { icon: Zap,       name: "Circuit Protection",  description: "MCB, MCCB, RCCB, CAM changeover switches & distribution boards",                         count: "80+ products",  href: "/aqua-electrical/circuit-protection" },
  { icon: Lightbulb, name: "Lighting",            description: "COB downlights, surface panels, flood lights, step lights & sensors",                     count: "60+ products",  href: "/aqua-electrical/lighting" },
  { icon: Network,   name: "Cable Management",    description: "PVC trunking, conduit, junction boxes & concealment accessories",                          count: "40+ products",  href: "/aqua-electrical/cable-management" },
  { icon: Battery,   name: "Power & Workspace",   description: "Extension leads with USB-C, floor boxes & motorised desk pop-ups",                         count: "30+ products",  href: "/aqua-electrical/power-workspace" },
  { icon: Bell,      name: "Doorbells",           description: "Wired & wireless doorbell systems with chime options",                                     count: "15+ products",  href: "/aqua-electrical/doorbells" },
  { icon: Wind,      name: "Fans",                description: "Ceiling fans & air purification units for every room",                                     count: "20+ products",  href: "/aqua-electrical/fans" },
  { icon: Package,   name: "Accessories",         description: "IP66 covers, travel adapters, capacitors & safety accessories",                            count: "50+ products",  href: "/aqua-electrical/accessories" },
];

export default function ElectricalCategories({ dbCategories }) {
  const categories =
    dbCategories && dbCategories.length > 0
      ? dbCategories.map((c) => {
          const meta = SLUG_META[c.slug] ?? { icon: Layers, description: "" };
          return {
            icon: meta.icon,
            name: c.name,
            description: meta.description,
            count: c.productCount != null ? `${c.productCount} products` : "",
            href: `/aqua-electrical/${c.slug}`,
          };
        })
      : STATIC_CATEGORIES;

  return (
    <CategoriesSection
      eyebrow="Aqua Electrical · Browse by category"
      title="Every product type,"
      titleAccent="built to spec."
      description="A complete electrical catalogue — from precision switches to circuit protection — organised by function so you find exactly what you need."
      categories={categories}
      columns={4}
      ctaHref="/aqua-electrical"
      ctaLabel="Browse all categories"
    />
  );
}
