import { Category } from "@/@types";
import { api } from "@/lib/api";

export async function getAllCategories(): Promise<Category> {
  const response = await api(`/categories`, { next: { revalidate: 1 } });
  const categories = await response.json();
  return categories;
}
