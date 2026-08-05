-- Migration: adds the "Original Perfume" flag and the "Original Perfumes"
-- category. Safe to re-run (idempotent) — run this in the Supabase SQL
-- Editor against an existing (already-seeded) database.

alter table products
  add column if not exists is_original boolean not null default false;

create index if not exists products_is_original_idx
  on products (is_original) where is_original;

insert into categories (name, slug, description, image_url)
values (
  'Original Perfumes',
  'original-perfumes',
  'Authentic, verified fragrances straight from the house.',
  null
)
on conflict (slug) do nothing;
