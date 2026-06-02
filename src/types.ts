export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Clásicas' | 'Premium' | 'Acompañamientos' | 'Bebidas' | 'Postres';
  image: string;
  rating?: number;
  reviewsCount?: number;
  ingredients?: string[];
}

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

export interface ExtraTopping {
  id: string;
  name: string;
  price: number;
}

export interface PizzaCustomization {
  size: PizzaSize;
  crust: 'Tradicional' | 'Fina y Crujiente' | 'Borde Relleno de Queso';
  extras: string[]; // List of extra topping IDs
}

export interface CartItem {
  id: string; // unique cart item id (to allow duplicate pizzas with different customizations)
  pizza: Pizza;
  customization?: PizzaCustomization;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  pointsDiscount: number;
  couponDiscount: number;
  tax: number;
  total: number;
  deliveryType: 'delivery' | 'pickup';
  address: string;
  instructions: string;
  paymentMethod: 'visa' | 'mastercard';
  status: 'received' | 'preparing' | 'in_oven' | 'on_delivery' | 'delivered';
  timestamp: string;
}

export interface FavoriteShortcut {
  id: string;
  title: string;
  description: string;
  image: string;
  items: CartItem[];
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  icon: string;
  premium?: boolean;
}

export interface Benefit {
  id: string;
  name: string;
  description: string;
  icon: string;
}
