import Link from "next/link";
import { UserRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/layout/SearchBar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { categories } from "@/lib/data/categories";

const primaryCategories = categories.slice(0, 6);

export function Header() {
  return (
    <header className="sticky top-0 z-30">
      <div className="bg-navy-900">
        <Container className="flex items-center gap-3 py-2.5 sm:gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-white"
            aria-label="GivenItems.org home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-amber-500 text-[17px] font-extrabold text-navy-900">
              G
            </span>
            <span className="hidden text-[17px] font-extrabold tracking-tight sm:inline">
              GivenItems<span className="text-green-050/70">.org</span>
            </span>
          </Link>

          <SearchBar className="min-w-0 flex-1" />

          <Link
            href="/how-it-works"
            className="hidden shrink-0 flex-col text-[12px] font-medium leading-tight text-white/85 lg:flex"
          >
            <span>Serving</span>
            <span className="text-[14px] font-bold text-white">Ohio, U.S.</span>
          </Link>

          <Link
            href="/sign-in"
            className="flex shrink-0 items-center gap-2 text-white"
          >
            <UserRound className="h-5 w-5 lg:hidden" />
            <span className="hidden flex-col text-[12px] font-medium leading-tight text-white/85 lg:flex">
              <span>Hello, sign in</span>
              <span className="text-[14px] font-bold text-white">Account &amp; claims</span>
            </span>
          </Link>

          <MobileMenu />
        </Container>
      </div>

      <div className="hidden bg-navy-800 lg:block">
        <Container className="flex items-center gap-5 overflow-x-auto py-2 text-[13.5px] font-semibold text-[#D3E0EA]">
          <Link href="/items" className="shrink-0 text-white">
            All items
          </Link>
          {primaryCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="shrink-0 whitespace-nowrap hover:text-white"
            >
              {c.name}
            </Link>
          ))}
          <Link
            href="/how-it-works"
            className="ml-auto shrink-0 whitespace-nowrap text-amber-400 hover:text-amber-500"
          >
            Our mission
          </Link>
          <Link
            href="/give-an-item"
            className="shrink-0 whitespace-nowrap text-amber-400 hover:text-amber-500"
          >
            Give an item
          </Link>
        </Container>
      </div>

      <div className="bg-green-700 px-4 py-2 text-center text-[13px] font-semibold text-green-050 sm:text-[13.5px]">
        A registered non-profit — items are always $0. You pay delivery plus a
        flat service fee.
      </div>
    </header>
  );
}
