import { create } from 'zustand';
import { UserRole, Product, Profile, Category } from './types';
import { supabase } from './services/supabase';
import { authService } from './services/auth';
import { productService } from './services/products';

interface CartItem {
  product: Product;
  quantity: number;
}

interface DraftProduct {
  title: string;
  description: string;
  price: string;
  stock: string;
  category: Category;
  image: string;
}

interface AppState {
  user: Profile | null;
  role: UserRole;
  cart: CartItem[];
  products: Product[];
  draftProduct: DraftProduct;
  isProcessing: boolean;
  isLoading: boolean;
  searchQuery: string;
  activeCategory: Category | 'All';
  isMenuOpen: boolean;
  isCartOpen: boolean;
  isProfileOpen: boolean;
  isFilterOpen: boolean;
  announcementText: string;
  setUser: (user: Profile | null) => void;
  setRole: (role: UserRole) => void;
  setProcessing: (status: boolean) => void;
  setLoading: (status: boolean) => void;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: Category | 'All') => void;
  setMenuOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setProfileOpen: (open: boolean) => void;
  setFilterOpen: (open: boolean) => void;
  setAnnouncementText: (text: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, delta: number) => void;
  setDraftProduct: (draft: Partial<DraftProduct>) => void;

  // Async Actions
  fetchProducts: () => Promise<void>;
  initializeAuth: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  role: UserRole.BUYER,
  cart: [],
  products: [],
  isProcessing: false,
  isLoading: false,
  searchQuery: '',
  activeCategory: 'All',
  isMenuOpen: false,
  isCartOpen: false,
  isProfileOpen: false,
  isFilterOpen: false,
  announcementText: 'Complimentary Delivery in Nairobi Region for the next 24 Hours.',
  draftProduct: {
    title: '',
    description: '',
    price: '',
    stock: '',
    category: 'Lifestyle',
    image: ''
  },
  setUser: (user) => set({ user }),
  setRole: (role) => {
    const { user } = get();
    if (role === UserRole.ADMIN && user?.role !== 'admin') {
      alert("CRITICAL ERROR: Unauthorized access to Command Center registry.");
      return;
    }
    set({ role });
  },
  setProcessing: (status) => set({ isProcessing: status }),
  setLoading: (status) => set({ isLoading: status }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
  setCartOpen: (isCartOpen) => set({ isCartOpen }),
  setProfileOpen: (isProfileOpen) => set({ isProfileOpen }),
  setFilterOpen: (isFilterOpen) => set({ isFilterOpen }),
  setAnnouncementText: (announcementText) => set({ announcementText }),
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.product.id === product.id);
    if (existing) {
      return {
        isCartOpen: true,
        cart: state.cart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { isCartOpen: true, cart: [...state.cart, { product, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.product.id !== productId)
  })),
  clearCart: () => set({ cart: [] }),
  updateQuantity: (productId, delta) => set((state) => ({
    cart: state.cart.map(item =>
      item.product.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    )
  })),
  setDraftProduct: (draft) => set((state) => ({
    draftProduct: { ...state.draftProduct, ...draft }
  })),

  // Async Actions Implementation
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const data = await productService.getProducts();
      set({ products: data });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  initializeAuth: () => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        authService.getProfile(session.user.id).then(profile => {
          if (profile) {
            set({ user: profile, role: profile.role });
          }
        });
      }
    });

    // Listen for changes
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        authService.getProfile(session.user.id).then(profile => {
          if (profile) {
            set({ user: profile, role: profile.role });
          }
        });
      } else {
        set({ user: null, role: UserRole.BUYER });
      }
    });
  }
}));
