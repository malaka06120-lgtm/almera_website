-- Migration: adds the "Tester" flag to products. Safe to re-run
-- (idempotent) — run this in the Supabase SQL Editor against an existing
-- database.

alter table products
  add column if not exists is_tester boolean not null default false;

create index if not exists products_is_tester_idx
  on products (is_tester) where is_tester;
