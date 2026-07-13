-- Almera Perfume E-commerce — Database Schema
-- Run this in the Supabase SQL Editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

-- ============================================================================
-- ENUMS
-- ============================================================================
create type gender_type as enum ('men', 'women', 'unisex');
create type order_status as enum (
  'pending',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'delivered',
  'cancelled'
);

-- ============================================================================
-- CATEGORIES
-- ============================================================================
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- PRODUCTS
-- ============================================================================
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  gender gender_type not null default 'unisex',
  category_id uuid references categories (id) on delete set null,
  images text[] not null default '{}',
  top_notes text[] not null default '{}',
  middle_notes text[] not null default '{}',
  base_notes text[] not null default '{}',
  is_featured boolean not null default false,
  is_best_seller boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_category_id_idx on products (category_id);
create index products_gender_idx on products (gender);
create index products_is_featured_idx on products (is_featured) where is_featured;
create index products_is_best_seller_idx on products (is_best_seller) where is_best_seller;

-- ============================================================================
-- PRODUCT VARIANTS (size / price / stock)
-- ============================================================================
create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  size_ml integer not null,
  price numeric(10, 2) not null check (price >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  sku text,
  created_at timestamptz not null default now(),
  unique (product_id, size_ml)
);

create index product_variants_product_id_idx on product_variants (product_id);

-- ============================================================================
-- REVIEWS / TESTIMONIALS
-- ============================================================================
create table reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products (id) on delete cascade,
  customer_name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  is_approved boolean not null default true,
  created_at timestamptz not null default now()
);

create index reviews_product_id_idx on reviews (product_id);

-- ============================================================================
-- ORDERS (Cash on Delivery — Egypt only)
-- ============================================================================
create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  full_name text not null,
  phone text not null,
  governorate text not null,
  city text not null,
  address text not null,
  notes text,
  status order_status not null default 'pending',
  subtotal numeric(10, 2) not null default 0,
  shipping_fee numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_status_idx on orders (status);
create index orders_created_at_idx on orders (created_at desc);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id) on delete cascade,
  product_id uuid references products (id) on delete set null,
  variant_id uuid references product_variants (id) on delete set null,
  product_name text not null,
  size_ml integer not null,
  unit_price numeric(10, 2) not null,
  quantity integer not null check (quantity > 0),
  line_total numeric(10, 2) not null
);

create index order_items_order_id_idx on order_items (order_id);

-- ============================================================================
-- CONTACT MESSAGES (from the public Contact page)
-- ============================================================================
create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- ADMINS (authorized dashboard users — references auth.users)
-- ============================================================================
create table admins (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- updated_at triggers
-- ============================================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

create trigger orders_set_updated_at
  before update on orders
  for each row execute function set_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table categories enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table reviews enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table admins enable row level security;
alter table contact_messages enable row level security;

create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from admins where id = auth.uid()
  );
$$ language sql stable security definer;

-- Public (storefront) read access
create policy "Public can read categories" on categories for select using (true);
create policy "Public can read active products" on products for select using (is_active = true or is_admin());
create policy "Public can read variants" on product_variants for select using (true);
create policy "Public can read approved reviews" on reviews for select using (is_approved = true or is_admin());

-- Admin write access (storefront writes go through server actions using the service role key)
create policy "Admins manage categories" on categories for all using (is_admin()) with check (is_admin());
create policy "Admins manage products" on products for all using (is_admin()) with check (is_admin());
create policy "Admins manage variants" on product_variants for all using (is_admin()) with check (is_admin());
create policy "Admins manage reviews" on reviews for all using (is_admin()) with check (is_admin());

-- Orders: only admins can read/write directly. Checkout is written server-side
-- with the service role key (bypasses RLS) so customer totals are always
-- recomputed from trusted product/variant prices.
create policy "Admins manage orders" on orders for all using (is_admin()) with check (is_admin());
create policy "Admins manage order items" on order_items for all using (is_admin()) with check (is_admin());

create policy "Admins read own row" on admins for select using (is_admin());

-- Contact form: anyone can send a message, only admins can read them.
create policy "Public can send contact messages" on contact_messages for insert with check (true);
create policy "Admins read contact messages" on contact_messages for select using (is_admin());
create policy "Admins update contact messages" on contact_messages for update using (is_admin()) with check (is_admin());

-- ============================================================================
-- STORAGE (product images)
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Admins can upload product images"
  on storage.objects for insert
  with check (bucket_id = 'product-images' and is_admin());

create policy "Admins can update product images"
  on storage.objects for update
  using (bucket_id = 'product-images' and is_admin());

create policy "Admins can delete product images"
  on storage.objects for delete
  using (bucket_id = 'product-images' and is_admin());
