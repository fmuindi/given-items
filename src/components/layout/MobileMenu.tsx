"use client";

import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories } from "@/lib/data/categories";

const links = [
  { href: "/items", label: "All items" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/give-an-item", label: "Give an item" },
  { href: "/safety", label: "Safety" },
  { href: "/fees-refunds", label: "Fees & refunds" },
  { href: "/help", label: "Help" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="tap-target -mr-2 flex items-center justify-center text-white lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Menu className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-navy-900/60 animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white shadow-popover animate-slide-up">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="text-[15px] font-extrabold text-ink">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="tap-target flex items-center justify-center text-ink-500"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col px-2 py-2" aria-label="Mobile">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-4 py-3.5 text-[15px] font-semibold text-ink hover:bg-page"
                >
                  {l.label}
                  <ChevronRight className="h-4 w-4 text-ink-400" />
                </Link>
              ))}
            </nav>

            <div className="mt-2 border-t border-line px-5 py-4">
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-wide text-ink-400">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/categories/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-line bg-page px-3.5 py-2 text-[13px] font-semibold text-ink-600 hover:border-green-700 hover:text-green-700"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-2 border-t border-line p-5">
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="tap-target flex items-center justify-center rounded-[var(--radius-control)] border border-navy-900 text-[14.5px] font-bold text-navy-900"
              >
                Sign in
              </Link>
              <Link
                href="/give-an-item"
                onClick={() => setOpen(false)}
                className="tap-target flex items-center justify-center rounded-[var(--radius-control)] bg-amber-500 text-[14.5px] font-bold text-navy-900"
              >
                Donate an item
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
