"use client";

import CategoriesSection from "@/components/blocks/v2/categories-section";
import { Wifi, Monitor, Smartphone, DoorOpen, Wind, ShieldCheck, Layers } from "lucide-react";

const SLUG_META = {
  "smart-switches":  { icon: Wifi,        description: "1–4 gang WiFi switches, voice & app controlled via Tuya / Smart Life" },
  "control-panels":  { icon: Monitor,     description: "Touch panels with scene, schedule & multi-device control" },
  "smart-remotes":   { icon: Smartphone,  description: "Universal IR remote controllers for all your devices" },
  "door-phones":     { icon: DoorOpen,    description: "Video intercom & smart entry systems with app access" },
  "smart-motors":    { icon: Wind,        description: "Curtain & blind automation for complete home control" },
  "smart-protection":{ icon: ShieldCheck, description: "Smart breakers & voltage protectors with app alerts" },
};

const STATIC_CATEGORIES = [
  { icon: Wifi,        name: "Smart Switches",   description: "1–4 gang WiFi switches, voice & app controlled via Tuya / Smart Life", count: "24+ products", href: "/aqua-smart/smart-switches" },
  { icon: Monitor,     name: "Control Panels",   description: "Touch panels with scene, schedule & multi-device control",              count: "8+ products",  href: "/aqua-smart/control-panels" },
  { icon: Smartphone,  name: "Smart Remotes",    description: "Universal IR remote controllers for all your devices",                  count: "6+ products",  href: "/aqua-smart/smart-remotes" },
  { icon: DoorOpen,    name: "Door Phones",      description: "Video intercom & smart entry systems with app access",                  count: "5+ products",  href: "/aqua-smart/door-phones" },
  { icon: Wind,        name: "Smart Motors",     description: "Curtain & blind automation for complete home control",                  count: "4+ products",  href: "/aqua-smart/smart-motors" },
  { icon: ShieldCheck, name: "Smart Protection", description: "Smart breakers & voltage protectors with app alerts",                   count: "10+ products", href: "/aqua-smart/smart-protection" },
];

export default function SmartCategories({ dbCategories }) {
  const categories =
    dbCategories && dbCategories.length > 0
      ? dbCategories.map((c) => {
          const meta = SLUG_META[c.slug] ?? { icon: Layers, description: "" };
          return {
            icon: meta.icon,
            name: c.name,
            description: meta.description,
            count: c.productCount != null ? `${c.productCount} products` : "",
            href: `/aqua-smart/${c.slug}`,
          };
        })
      : STATIC_CATEGORIES;

  return (
    <CategoriesSection
      eyebrow="Smart Home · Browse by device"
      title="Every smart device,"
      titleAccent="one ecosystem."
      description="From single-gang WiFi switches to full-room scene controllers — explore the Aqua Smart range organised by device type."
      categories={categories}
      columns={3}
      ctaHref="/aqua-smart"
      ctaLabel="View all smart products"
    />
  );
}
