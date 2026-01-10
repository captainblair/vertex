
import { supabase } from './supabase';
import { Product, Category } from '../types';

export const productService = {
    async getProducts(): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(name)');

        if (error) throw error;

        return data.map((item: any) => ({
            id: item.id,
            title: item.name,
            description: item.description,
            price: item.price,
            stock: item.stock_quantity,
            image: item.image_urls?.[0] || '',
            category: (item.categories?.name as Category) || 'Lifestyle',
            is_approved: true,
            vendor_name: 'Vertex',
            is_featured: item.is_featured,
            specs: item.metadata || {},
        }));
    },

    async addProduct(product: Partial<Product>) {
        let categoryId = null;

        if (product.category) {
            const { data: categoryData } = await supabase
                .from('categories')
                .select('id')
                .eq('name', product.category)
                .single();

            if (categoryData) {
                categoryId = categoryData.id;
            }
        }

        const { data, error } = await supabase
            .from('products')
            .insert({
                name: product.title,
                description: product.description,
                price: product.price,
                stock_quantity: product.stock,
                category_id: categoryId,
                image_urls: product.image ? [product.image] : [],
                is_featured: product.is_featured || false,
                metadata: product.specs || {},
            })
            .select();

        if (error) throw error;
        return data;
    },

    async updateProduct(id: string, updates: Partial<Product>) {
        const { error } = await supabase
            .from('products')
            .update({
                name: updates.title,
                description: updates.description,
                price: updates.price,
                stock_quantity: updates.stock,
                is_featured: updates.is_featured,
                metadata: updates.specs,
            })
            .eq('id', id);

        if (error) throw error;
    },

    async deleteProduct(id: string) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async getCategories() {
        const { data, error } = await supabase
            .from('categories')
            .select('*');
        if (error) throw error;
        return data;
    }
};
