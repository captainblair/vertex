
import { create } from 'zustand';
import { UserRole, Product, Profile, Category } from './types';

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
}

interface AppState {
  user: Profile | null;
  role: UserRole;
  cart: CartItem[];
  draftProduct: DraftProduct;
  isProcessing: boolean;
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
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: 'usr_1',
    email: 'admin@vertex.com',
    role: UserRole.ADMIN,
    full_name: 'Vertex Admin',
    phone_number: '254700000000'
  },
  role: UserRole.BUYER,
  cart: [],
  isProcessing: false,
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
    category: 'Lifestyle'
  },
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  setProcessing: (status) => set({ isProcessing: status }),
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
  }))
}));
