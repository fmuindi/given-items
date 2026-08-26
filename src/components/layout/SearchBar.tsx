"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.push(`/items${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Search free items"
      className={className}
    >
      <div className="flex h-11 overflow-hidden rounded-[var(--radius-control)] bg-white">
        <label htmlFor="site-search" className="sr-only">
          Search free items near you
        </label>
        <input
          id="site-search"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search free items near you…"
          className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-ink placeholder:text-ink-400 outline-none"
        />
        <button
          type="submit"
          className="flex w-12 shrink-0 items-center justify-center bg-amber-500 text-navy-900 transition-colors hover:bg-amber-600 tap-target"
          aria-label="Search"
        >
          <Search className="h-[19px] w-[19px]" strokeWidth={2.4} />
        </button>
      </div>
    </form>
  );
}
