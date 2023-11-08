export interface Product {
  id: string;
  title: string;
  slug: string;
  coverUrl: string | null;
  harmonization: string | null;
  validate: string | null;
  isDestack: boolean;
  categoryId: string | null;
  createdAt: Date;
  productDetail: ProductDetail[];
  category: Category;
  ingredients: Ingredient[];
}

export interface Category {
  id: string;
  title: string;
  description: string | null;
  coverUrl: string | null;
  createdAt: Date;
}

export interface Ingredient {
  id: string;
  name: string;
  cor: string | null;
  imageUrl: string | null;
  createdAt: Date;
}

export interface ProductDetail {
  id: string;
  weight: number;
  netWeight: number;
  discount?: number;
  price: number;
  qunatityInStock: number;
  productId: string;
  createdAt: Date;
}

export interface SelectedProduct {
  id: string;
  title: string;
  coverUrl: string;
  price: number;
  weight: number;
  netWeight: number;
  quantity: number;
}

export interface InfoClient {
  fullName: string;
  userId: string;
  email: string;
  phone: string;
  postalCode: string;
  address: string;
  city: string;
  country: string;
  complement: string;
  observations: string;
}

export interface OrderProps {
  orderNumber: string;
  userId: string;
  statusPayment: "PENDING" | "PAID" | "CANCELED";
  statusOrder: "PENDING" | "PREPERING" | "CANCELED" | "SHIPPED" | "DELIVERED";
  fullName: string;
  email: string;
  phone: string;
  postalCode: string;
  address: string;
  city: string;
  country: string;
  complement?: string;
  observations?: string;
  totalAmount: number;
  delivered: boolean;
  selectedProduct: SelectedProduct[];
}

export interface TestimonialTypes {
  id: string;
  name: string;
  testimonial: string;
  email: string | null;
  imageUrl: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
