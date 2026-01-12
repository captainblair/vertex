
import { supabase } from './supabase';
import { UserRole, Profile } from '../types';

export const authService = {
    async signUp(email: string, password: string, fullName: string, phoneNumber: string) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    phone_number: phoneNumber
                }
            }
        });

        if (authError) throw authError;
        return authData.user;
    },

    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data.user;
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    async getProfile(userId: string): Promise<Profile | null> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
            return null;
        }

        return {
            id: data.id,
            email: data.email,
            role: data.role as UserRole,
            full_name: data.full_name,
            phone_number: data.phone_number,
        };
    }
};
