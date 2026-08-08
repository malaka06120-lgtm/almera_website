# Almera — Luxury Perfume E-Commerce

A production-ready, full-stack e-commerce site for the Almera fragrance
brand, built with Next.js 15 (App Router), TypeScript, Tailwind CSS,
shadcn/ui-style components, and Supabase (Postgres + Auth + Storage).

Cash on Delivery only, Egypt-only shipping, admin dashboard for full
catalog and order management.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components, Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, custom blush/black/gold luxury theme
- **UI Components:** Hand-rolled shadcn/ui-style components on Radix UI primitives
- **Database / Auth / Storage:** Supabase
- **Email:** Resend (contact form + new order notifications)
- **State:** Zustand (cart + wishlist, persisted to localStorage)
- **Forms:** react-hook-form + Zod
- **Deployment:** Vercel

## Project Structure

```
src/
  app/
    (site)/            # Public storefront (shares header/footer layout)
      page.tsx          # Home
      shop/             # Shop with filters, search, sort
      product/[slug]/   # Product details
      categories/       # Categories index
      about/            # About Almera
      contact/          # Contact form
      cart/             # Cart page
      checkout/         # Checkout (COD)
      order-success/[orderId]/
      wishlist/
    admin/
      login/            # Admin sign-in (no sidebar)
      (dashboard)/       # Sidebar shell, guarded by middleware + layout check
        page.tsx          # Dashboard overview (stats, low stock, recent orders)
        products/          # Product list, create, edit
        orders/            # Order list, search, status updates
    api/
      contact/            # Contact form email route (Resend)
  components/
    ui/                 # Base primitives (button, dialog, table, etc.)
    layout/             # Header, footer, cart drawer, mobile nav
    product/            # Product card, gallery, notes pyramid, reviews
    home/               # Hero, carousels, testimonials, Instagram gallery
    shop/               # Filters, sort, mobile filter sheet
    admin/              # Product form, image uploader, order status controls
  lib/
    supabase/           # Browser / server / middleware / service-role clients
    data/                # Server-only data-fetching functions
    actions/             # Server Actions (orders, products, auth)
    email/                # Order notification email (Resend)
    validations.ts       # Zod schemas
    constants.ts          # Governorates, shipping fee, order status labels
  store/                # Zustand cart & wishlist stores
  types/                # Shared TypeScript types
supabase/
  schema.sql            # Full database schema, RLS policies, storage bucket
  seed.sql              # Optional demo products/categories/reviews
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In the SQL Editor, run `supabase/schema.sql` (creates tables, enums,
   RLS policies, and the `product-images` storage bucket).
3. Optionally run `supabase/seed.sql` for demo categories/products/reviews.
4. Create your first admin user:
   - In **Authentication > Users**, add a user with an email + password.
   - In the SQL Editor, run:
     ```sql
     insert into admins (id, email, full_name)
     values ('<the-user-uuid-from-auth.users>', 'you@example.com', 'Your Name');
     ```

### 3. Create a Resend account

1. Sign up at [resend.com](https://resend.com) and create an API key at
   [resend.com/api-keys](https://resend.com/api-keys).
2. By default, emails send from the shared `onboarding@resend.dev` address,
   which can **only** deliver to the email your Resend account is registered
   under. To send to other recipients (e.g. multiple admins) or from your
   own domain, verify a domain at [resend.com/domains](https://resend.com/domains)
   and set `RESEND_FROM_EMAIL` to an address on it.

### 4. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your real values:

```bash
cp .env.local.example .env.local
```

| Variable | Where it's used | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Browser + server Supabase clients | Project Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser + server Supabase clients | Project Settings > API — safe to expose |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only (`src/lib/supabase/admin.ts`) | **Secret.** Bypasses RLS. Never expose to the browser. |
| `NEXT_PUBLIC_SITE_URL` | Metadata, sitemap, robots.txt | Set to your real production domain in Vercel |
| `RESEND_API_KEY` | `/api/contact`, order notification emails | resend.com/api-keys |
| `RESEND_FROM_EMAIL` | Same as above | Optional — defaults to `Almera <onboarding@resend.dev>` |
| `ADMIN_EMAIL` | `/api/contact`, order notification emails | Comma-separated for multiple recipients (requires a verified domain — see above) |
| `NEXT_PUBLIC_GA_ID` | `src/app/layout.tsx` (Google Analytics) | Optional — Measurement ID from GA4 (`G-XXXXXXXXXX`). Analytics is skipped entirely if unset. |
| `NEXT_PUBLIC_META_PIXEL_ID` | `src/app/layout.tsx` (Meta Pixel) | Optional — Pixel ID from Meta Events Manager. Skipped entirely if unset. |

### 5. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the storefront and
[http://localhost:3000/admin/login](http://localhost:3000/admin/login) for
the admin dashboard.

## How Key Flows Work

- **Cart & Wishlist** are client-only state (Zustand + localStorage) — no
  customer account is required to shop.
- **Checkout** submits to a Server Action (`src/lib/actions/orders.ts`) that
  re-fetches authoritative prices/stock from the database using the Supabase
  service-role client, so client-side tampering with prices is not possible.
  Stock is decremented atomically per line item. Once the order is fully
  saved, a notification email fires to `ADMIN_EMAIL` (failures here are
  logged but never fail the checkout — the order is already safe).
- **Contact form** posts to `/api/contact`, which validates the input,
  emails `ADMIN_EMAIL` via Resend, and best-effort logs the message to the
  `contact_messages` table.
- **Order Success** page URL uses the order's random UUID (not the
  human-friendly order number), so order details can't be enumerated by
  guessing sequential order numbers.
- **Admin access** is enforced in three layers: `middleware.ts` (redirects
  unauthenticated/non-admin requests), the `(dashboard)/layout.tsx` server
  check, and Postgres Row Level Security policies (`is_admin()`). The
  post-login redirect is restricted to same-origin relative paths only, to
  prevent open-redirect abuse via a crafted `?redirectTo=` link.

## Deploying to Vercel

1. Push this repository to GitHub (already connected — see `git remote -v`).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
   (skip this if the project is already imported).
3. In the Vercel project's **Settings > Environment Variables**, add all
   seven variables listed in the table above, using your real production
   values. Set `NEXT_PUBLIC_SITE_URL` to your actual Vercel/custom domain
   (e.g. `https://almera.vercel.app` or `https://almera.com`) — **not**
   `http://localhost:3000`.
4. Deploy. Vercel detects Next.js automatically; no build configuration is
   required beyond the environment variables.
5. In Supabase, add your production domain under **Authentication > URL
   Configuration** (Site URL / Redirect URLs) so admin login works there too.
6. **Every future push to the connected branch (`main`) automatically
   triggers a new Vercel deployment** — no manual redeploy step needed once
   the project is imported and the env vars are set.

## Scripts

```bash
npm run dev     # Start the dev server
npm run build   # Production build
npm run start   # Start the production server (after build)
npm run lint    # Run ESLint
```
