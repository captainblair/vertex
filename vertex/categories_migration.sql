-- Vertex Taxonomy Migration | Seed New Categories
-- Run this in your Supabase SQL Editor

-- 1. Insert New Categories
INSERT INTO categories (name, slug)
VALUES 
    ('Fashion', 'fashion'),
    ('Home & Living', 'home-living'),
    ('Health & Beauty', 'health-beauty'),
    ('Supermarket', 'supermarket'),
    ('Sports & Outdoors', 'sports-outdoors'),
    ('Automotive', 'automotive'),
    ('Phones & Tablets', 'phones-tablets')
ON CONFLICT (name) DO NOTHING;

-- 2. Optional: Rename 'Apparel' to 'Fashion' for existing products if desired
-- UPDATE products SET category_id = (SELECT id FROM categories WHERE name = 'Fashion')
-- WHERE category_id = (SELECT id FROM categories WHERE name = 'Apparel');
