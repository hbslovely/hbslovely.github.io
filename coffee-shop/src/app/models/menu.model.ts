export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  note?: string;
}

export interface OrderInfo {
  customerName?: string;
  address: string;
  phone: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: Date;
} 