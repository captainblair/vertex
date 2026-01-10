
export enum UserRole {
  BUYER = 'buyer',
  ADMIN = 'admin'
}

export type Category = 'Electronics' | 'Apparel' | 'Lifestyle';

export interface ProductVariant {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  stock: number;
  image: string;
  category: Category;
  is_approved: boolean;
  vendor_name: string; // Will always be "Vertex" now
  variants?: ProductVariant[];
  specs?: Record<string, string>;
  is_flash_sale?: boolean;
  is_featured?: boolean;
}

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  phone_number: string;
}

export interface Order {
  id: string;
  buyer_id: string;
  total_amount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  payment_method: 'M-PESA';
  created_at: string;
  transaction_id?: string;
}
