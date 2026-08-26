import Link from "next/link";
import { Container } from "@/components/ui/Container";

const columns = [
  {
    title: "Browse",
    links: [
      { href: "/items", label: "All items" },
      { href: "/categories/appliances", label: "Appliances" },
      { href: "/categories/furniture", label: "Furniture" },
      { href: "/categories/vehicles", label: "Vehicles" },
    ],
  },
  {
    title: "About us",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/fees-refunds", label: "Fees & refunds" },
      { href: "/safety", label: "Safety" },
      { href: "/give-an-item", label: "Give an item" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/help", label: "Help centre" },
      { href: "/safety", label: "Report a concern" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-navy-900 text-[#C6D6E3]">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2 text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-[15px] font-extrabold text-navy-900">
              G
            </span>
            <span className="text-[15px] font-extrabold">GivenItems.org</span>
          </div>
          <p className="mt-3 max-w-[250px] text-[13.5px] leading-relaxed">
            A non-profit keeping usable items out of landfill and getting
            them to households that need them.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <div className="text-[12px] font-extrabold uppercase tracking-wider text-[#7E9AB2]">
              {col.title}
            </div>
            <div className="mt-3 flex flex-col gap-2.5 text-[14px]">
              {col.links.map((l) => (
                <Link key={l.href} href={l.href} className="text-[#D6E3EC] hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </Container>
      <div className="border-t border-navy-700">
        <Container className="py-4 text-[13px] text-[#7E9AB2]">
          © {new Date().getFullYear()} GivenItems.org · Registered non-profit ·
          United States
        </Container>
      </div>
    </footer>
  );
}
