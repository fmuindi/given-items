import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

/**
 * Donor photos vary wildly in framing — a close-up product shot next to a
 * wide shot of the whole room. A plain center object-fit crop can't tell
 * those apart. ImageKit (the CDN these photos are served from) can: its
 * `fo-auto` focus mode uses saliency detection to pick the crop region
 * itself, so a square thumbnail actually centers on the item instead of
 * whatever happens to be in the middle of the original frame.
 */
export function imagekitSquareThumb(url: string, size = 600) {
  try {
    const u = new URL(url);
    if (!u.hostname.endsWith("imagekit.io")) return url;
    u.searchParams.set("tr", `f-auto,q-auto,w-${size},h-${size},fo-auto`);
    return u.toString();
  } catch {
    return url;
  }
}

export function relativeTime(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - then);
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < hour) return `${Math.max(1, Math.round(diffMs / minute))}m ago`;
  if (diffMs < day) return `${Math.round(diffMs / hour)}h ago`;
  const days = Math.round(diffMs / day);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  return `${months}mo ago`;
}
