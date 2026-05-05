export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Men' | 'Women' | 'Kids' | 'Accessories';
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  isNewArrival: boolean;
  isSale: boolean;
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  loyaltyPoints: number;
  wishlist: string[];
  isAdmin: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  createdAt: string;
  pointsEarned: number;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: 'arrival' | 'sale' | 'order' | 'system';
}
