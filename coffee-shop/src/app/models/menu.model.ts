export interface MenuItem {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  categoryId: string;
  image?: string;
  recommended?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface GroupedMenuItem {
  category: Category;
  items: MenuItem[];
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  quantity: number;
  note: string;
}

export interface OrderInfo {
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: Date;
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'default' | 'price_asc' | 'price_desc'; 