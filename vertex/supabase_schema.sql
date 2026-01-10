-- Vertex Elite Marketplace | Supabase PostgreSQL Schema
-- Includes: Types, Tables, RLS Policies, and Indexes

-- 1. CUSTOM TYPES (ENUMS)
-------------------------------------------------------------------------------
-- User Roles
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'buyer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Order Status
DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Payment Status
DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('requested', 'completed', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;


-- 2. TABLES
-------------------------------------------------------------------------------

-- A. Profiles (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  phone_number TEXT, -- Format: 254XXXXXXXXX for M-PESA
  role user_role DEFAULT 'buyer',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- B. Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE, -- e.g., 'electronics'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- C. Trigger: Auto-create Profile on Signup
-- This ensures profiles are created even before email confirmation, bypassing RLS.
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone_number, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''), 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'phone_number', ''), 
    'buyer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- C. Products
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(12, 2) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  stock_quantity INTEGER DEFAULT 0,
  image_urls TEXT[] NOT NULL DEFAULT '{}', -- Array to support the gallery feel
  is_featured BOOLEAN DEFAULT false, -- For the "Hero Item" grid flag
  metadata JSONB DEFAULT '{}', -- For technical specs (size, material, weight)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- D. Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  total_amount NUMERIC(12, 2) NOT NULL,
  status order_status DEFAULT 'pending',
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- E. Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(12, 2) NOT NULL
);

-- F. M-PESA Transactions
CREATE TABLE IF NOT EXISTS mpesa_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  merchant_request_id TEXT UNIQUE NOT NULL,
  checkout_request_id TEXT UNIQUE NOT NULL, -- Used to poll status
  status payment_status DEFAULT 'requested',
  amount NUMERIC(12, 2) NOT NULL,
  mpesa_receipt_number TEXT UNIQUE, -- Provided in Daraja Callback
  result_desc TEXT, -- Feedback from Safaricom
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);


-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-------------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE mpesa_transactions ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check if user is Admin
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES Policies
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (is_admin());

-- PRODUCTS & CATEGORIES Policies
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Admins have full control over categories" ON categories;
DROP POLICY IF EXISTS "Admins have full control over products" ON products;

CREATE POLICY "Anyone can view categories" ON categories FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Anyone can view products" ON products FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins have full control over categories" ON categories 
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins have full control over products" ON products 
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ORDERS & ORDER ITEMS Policies
DROP POLICY IF EXISTS "Buyers can view their own orders" ON orders;
DROP POLICY IF EXISTS "Buyers can create orders" ON orders;
DROP POLICY IF EXISTS "Buyers can view their own order items" ON order_items;
DROP POLICY IF EXISTS "Buyers can insert order items" ON order_items;
DROP POLICY IF EXISTS "Admins have full control over orders" ON orders;
DROP POLICY IF EXISTS "Admins have full control over order_items" ON order_items;

CREATE POLICY "Buyers can view their own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Buyers can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Buyers can view their own order items" ON order_items 
  FOR SELECT USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

CREATE POLICY "Buyers can insert order items" ON order_items 
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

CREATE POLICY "Admins have full control over orders" ON orders FOR ALL USING (is_admin());
CREATE POLICY "Admins have full control over order_items" ON order_items FOR ALL USING (is_admin());

-- M-PESA TRANSACTIONS Policies
DROP POLICY IF EXISTS "Buyers can view their own transactions" ON mpesa_transactions;
DROP POLICY IF EXISTS "Admins can view all transactions" ON mpesa_transactions;

CREATE POLICY "Buyers can view their own transactions" ON mpesa_transactions 
  FOR SELECT USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = mpesa_transactions.order_id AND orders.user_id = auth.uid()));

CREATE POLICY "Admins can view all transactions" ON mpesa_transactions FOR SELECT USING (is_admin());


-- 4. RECOMMENDED INDEXES
-------------------------------------------------------------------------------
-- Speed up M-PESA Callback lookups
CREATE INDEX IF NOT EXISTS idx_mpesa_checkout_id ON mpesa_transactions(checkout_request_id);

-- Speed up product filtering by category
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);

-- Speed up user order history
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
