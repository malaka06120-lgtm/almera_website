-- Migration: removes the "Oud & Woody" category and updates category
-- images for Citrus, Floral, Oriental, and Original Perfumes. Safe to
-- re-run — run this in the Supabase SQL Editor against an existing
-- database.

-- Products previously in "Oud & Woody" are preserved; category_id
-- references categories with `on delete set null`, so their category_id
-- simply becomes null.
delete from categories where slug = 'oud-woody';

update categories set image_url = '/placeholders/citrus.jpeg' where slug = 'citrus';
update categories set image_url = '/placeholders/floral.jpeg' where slug = 'floral';
update categories set image_url = '/placeholders/oriental.jpeg' where slug = 'oriental';
update categories set image_url = '/placeholders/original.jpeg' where slug = 'original-perfumes';
