import { Product } from "@/@types";
import { api } from "@/lib/api";

export async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`);
  const product = await response.json();
  return product;
}

export async function getAllProducts(): Promise<Product[]> {
  const response = await api("/products");
  const products = await response.json();
  return products;
}
