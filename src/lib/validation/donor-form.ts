import { z } from "zod";

export const donorFormSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid U.S. phone number")
    .max(20, "Enter a valid U.S. phone number"),

  addressLine1: z.string().trim().min(3, "Enter a street address"),
  city: z.string().trim().min(2, "Enter a city"),
  state: z.string().trim().length(2, "Use a 2-letter state code (e.g. OH)"),
  zip: z.string().trim().min(5, "Enter a valid ZIP code").max(10),

  category: z.string().min(1, "Choose a category"),
  title: z.string().trim().min(4, "Give the item a short, clear title"),
  description: z
    .string()
    .trim()
    .min(20, "Describe the item in at least 20 characters"),

  condition: z.enum(["Like new", "Good", "Fair", "Working", "Needs repair"], {
    error: "Select a condition",
  }),
  knownDefects: z.string().trim().min(1, "Describe defects, or write \"None noted\""),
  includedParts: z.string().trim().optional(),

  deliveryType: z.enum(["Parcel", "Local delivery", "Pickup", "Manual freight"], {
    error: "Select a delivery option",
  }),
  dimensions: z.string().trim().min(1, "Estimated dimensions help us plan delivery"),
  weight: z.string().trim().min(1, "Estimated weight helps us plan delivery"),

  photoCount: z
    .number()
    .min(1, "Add at least one photo so staff can verify condition"),

  consentVerification: z.literal(true, {
    error: "Required to submit your item",
  }),
  consentPrivacy: z.literal(true, {
    error: "Required to submit your item",
  }),
});

export type DonorFormValues = z.infer<typeof donorFormSchema>;

export const donorFormSteps: { id: string; title: string; fields: (keyof DonorFormValues)[] }[] = [
  { id: "contact", title: "Contact", fields: ["fullName", "email", "phone"] },
  { id: "location", title: "Location", fields: ["addressLine1", "city", "state", "zip"] },
  { id: "item", title: "Item facts", fields: ["category", "title", "description"] },
  {
    id: "condition",
    title: "Condition",
    fields: ["condition", "knownDefects", "includedParts"],
  },
  {
    id: "logistics",
    title: "Logistics",
    fields: ["deliveryType", "dimensions", "weight"],
  },
  { id: "media", title: "Photos", fields: ["photoCount"] },
  {
    id: "declarations",
    title: "Review",
    fields: ["consentVerification", "consentPrivacy"],
  },
];
