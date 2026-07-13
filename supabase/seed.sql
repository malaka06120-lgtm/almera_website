-- Optional demo data for Almera. Safe to run once after schema.sql.
-- Replace image URLs with your own Supabase Storage / CDN URLs after upload.

-- Image URLs below point to the placeholder illustrations generated at
-- public/placeholders/ (self-authored, brand-safe). Replace with real
-- product photography (e.g. Supabase Storage URLs) whenever it's ready.
insert into categories (name, slug, description, image_url) values
  ('Floral', 'floral', 'Delicate bouquets of rose, jasmine, and peony.', '/placeholders/category-floral.svg'),
  ('Oud & Woody', 'oud-woody', 'Rich, warm woods layered with rare oud.', '/placeholders/category-oud-woody.svg'),
  ('Citrus', 'citrus', 'Bright, sparkling top notes for everyday wear.', '/placeholders/category-citrus.svg'),
  ('Oriental', 'oriental', 'Spiced amber and vanilla for the evening.', '/placeholders/category-oriental.svg')
on conflict (slug) do nothing;

with cat_floral as (select id from categories where slug = 'floral'),
     cat_oud as (select id from categories where slug = 'oud-woody'),
     cat_citrus as (select id from categories where slug = 'citrus'),
     cat_oriental as (select id from categories where slug = 'oriental'),
     p1 as (
       insert into products (name, slug, description, gender, category_id, images, top_notes, middle_notes, base_notes, is_featured, is_best_seller)
       values (
         'Almera Rose Noir', 'almera-rose-noir',
         'A velvety dark rose wrapped in warm musk — bold, romantic, and unforgettable.',
         'women', (select id from cat_floral),
         array['/placeholders/product-rose-noir-1.svg', '/placeholders/product-rose-noir-2.svg'],
         array['Black Currant', 'Bergamot'], array['Turkish Rose', 'Peony'], array['Musk', 'Sandalwood'],
         true, true
       ) returning id
     ),
     p2 as (
       insert into products (name, slug, description, gender, category_id, images, top_notes, middle_notes, base_notes, is_featured, is_best_seller)
       values (
         'Almera Oud Royal', 'almera-oud-royal',
         'Regal oud and amber for those who command a room in silence.',
         'men', (select id from cat_oud),
         array['/placeholders/product-oud-royal-1.svg', '/placeholders/product-oud-royal-2.svg'],
         array['Saffron', 'Cardamom'], array['Oud', 'Rose'], array['Amber', 'Leather'],
         true, false
       ) returning id
     ),
     p3 as (
       insert into products (name, slug, description, gender, category_id, images, top_notes, middle_notes, base_notes, is_featured, is_best_seller)
       values (
         'Almera Citrus Bloom', 'almera-citrus-bloom',
         'Sparkling citrus and white flowers — light, fresh, endlessly wearable.',
         'unisex', (select id from cat_citrus),
         array['/placeholders/product-citrus-bloom-1.svg'],
         array['Bergamot', 'Lemon'], array['Neroli', 'Jasmine'], array['White Musk', 'Cedar'],
         false, true
       ) returning id
     ),
     p4 as (
       insert into products (name, slug, description, gender, category_id, images, top_notes, middle_notes, base_notes, is_featured, is_best_seller)
       values (
         'Almera Amber Nuit', 'almera-amber-nuit',
         'A sensual oriental of spiced amber and vanilla for evening wear.',
         'unisex', (select id from cat_oriental),
         array['/placeholders/product-amber-nuit-1.svg'],
         array['Cinnamon', 'Pink Pepper'], array['Amber', 'Tonka Bean'], array['Vanilla', 'Benzoin'],
         true, true
       ) returning id
     )
insert into product_variants (product_id, size_ml, price, stock_quantity, sku)
select id, 50, 1450.00, 25, 'RN-50' from p1
union all select id, 100, 2200.00, 18, 'RN-100' from p1
union all select id, 50, 1650.00, 12, 'OR-50' from p2
union all select id, 100, 2600.00, 9, 'OR-100' from p2
union all select id, 50, 1150.00, 30, 'CB-50' from p3
union all select id, 100, 1800.00, 20, 'CB-100' from p3
union all select id, 50, 1350.00, 15, 'AN-50' from p4
union all select id, 100, 2100.00, 10, 'AN-100' from p4;

insert into reviews (product_id, customer_name, rating, comment)
select id, 'Nourhan A.', 5, 'Almera Rose Noir lasts all day and the compliments never stop.' from products where slug = 'almera-rose-noir'
union all
select id, 'Kareem M.', 5, 'Oud Royal is exactly what I was looking for — deep, warm, luxurious.' from products where slug = 'almera-oud-royal'
union all
select null, 'Mariam S.', 5, 'Packaging feels so premium and delivery to Alexandria was fast.'
union all
select null, 'Youssef T.', 4, 'Great scent longevity, will definitely order again.';
