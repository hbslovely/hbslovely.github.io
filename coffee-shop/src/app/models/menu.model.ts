export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  recommended?: boolean;
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

export interface MenuData {
  categories: string[];
  items: MenuItem[];
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'default' | 'price_asc' | 'price_desc'; 