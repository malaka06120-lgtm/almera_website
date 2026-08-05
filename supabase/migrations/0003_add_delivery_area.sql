-- Migration: replaces the flat "governorate" field and flat shipping fee
-- with an area-based delivery fee. Run this in the Supabase SQL Editor
-- against an existing database.
--
-- Renaming preserves existing order data — old orders keep their previous
-- governorate string in delivery_area (harmless; it's a free-text column,
-- not validated against the delivery-areas list retroactively) and their
-- previously-charged fee in delivery_fee.

alter table orders rename column governorate to delivery_area;
alter table orders rename column shipping_fee to delivery_fee;
