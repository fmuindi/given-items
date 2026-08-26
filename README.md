# GivenItems.org

A mobile-first, staff-verified giving platform: donors submit items
privately, staff verify and publish them, and eligible recipients claim
one free item at a time. This repository currently contains the
**public-facing marketing and catalogue site** — home, browse/search,
item detail, categories, how it works, the donor intake form, and the
policy pages — built to the visual design and information architecture
in the project's development blueprint.

## What's in this build

- Next.js App Router + TypeScript + Tailwind CSS v4
- Fully responsive, mobile-first layout (320px and up), with a sticky
  claim CTA on mobile and a filter rail on desktop
- Accessible by default: skip link, visible focus states, semantic
  landmarks, keyboard-operable menus and disclosures
- A donor intake form (contact → location → item facts → condition →
  logistics → photos → declarations) with client + schema validation
- Realistic seed data for listings, categories and conditions
- SEO metadata, sitemap and robots.txt

## What's intentionally not wired up yet

This is the public UI milestone. Accounts, payments, delivery quoting,
staff verification tooling and the database are not connected — sign-in
and donor submission show a clear in-app note rather than pretending to
work. The next milestones (per the project blueprint) are:

1. Supabase Postgres schema, RLS policies and auth
2. Real donor submission storage + staff verification/admin workspace
3. Recipient eligibility, atomic reservations and Stripe Checkout
4. EasyPost delivery quoting and fulfillment tracking

Each of those needs its own provider accounts and credentials before it
can be built safely — see `AGENTS.md`/`CLAUDE.md` context and the
project blueprint for the full non-negotiables list.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint
