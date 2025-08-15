export interface MenuItem {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  price?: number; // For compatibility with cart items
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  note?: string;
  price: number; // Required in cart items
}

export interface OrderInfo {
  customerName?: string;
  address: string;
  phone: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: Date;
} 