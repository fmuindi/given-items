import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "appliances",
    name: "Appliances",
    blurb: "Refrigerators, washers, microwaves and more, checked and working.",
    icon: "appliance",
  },
  {
    slug: "furniture",
    name: "Furniture",
    blurb: "Sofas, tables, beds and storage pieces in usable condition.",
    icon: "furniture",
  },
  {
    slug: "lawn-garden",
    name: "Lawn & garden",
    blurb: "Mowers, trimmers and outdoor tools, serviced where needed.",
    icon: "garden",
  },
  {
    slug: "tools",
    name: "Tools",
    blurb: "Hand and power tools verified for safety before listing.",
    icon: "tools",
  },
  {
    slug: "electronics",
    name: "Electronics",
    blurb: "TVs, computers and small electronics tested to power on.",
    icon: "electronics",
  },
  {
    slug: "kitchen",
    name: "Kitchen",
    blurb: "Cookware, small appliances and dining essentials.",
    icon: "kitchen",
  },
  {
    slug: "vehicles",
    name: "Vehicles",
    blurb: "Cars, riding equipment and parts, reviewed case by case.",
    icon: "vehicle",
  },
  {
    slug: "sports-outdoor",
    name: "Sports & outdoor",
    blurb: "Bikes, fitness equipment and outdoor gear.",
    icon: "sports",
  },
  {
    slug: "home-decor",
    name: "Home & decor",
    blurb: "Rugs, lighting, curtains and other home textiles.",
    icon: "decor",
  },
  {
    slug: "clothing",
    name: "Clothing & accessories",
    blurb: "Shoes, clothing and small personal items.",
    icon: "clothing",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
