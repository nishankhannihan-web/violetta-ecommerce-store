export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  ratingCount: number;
  image: string;
  hoverImage: string;
  soldPercent?: number;
  stock: number;
  colors: ProductColor[];
  sizes: string[];
  badge?: string;
  isFlashSale?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  description: string;
  specs: Record<string, string>;
  features: string[];
}

export interface CartItem {
  id: string; // unique composite key id-color-size
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize: string;
}

export interface Category {
  id: string;
  name: string;
  itemCount: number;
  image: string;
  iconName: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
  productName?: string;
}

export interface VideoProof {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  views: string;
  videoUrl?: string;
}

export interface DealOffer {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  badge: string;
  discount: string;
  bgGradient: string;
  expiresIn: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentDetails {
  method: 'card' | 'apple_pay' | 'paypal' | 'cod';
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  estimatedDelivery: string;
}
