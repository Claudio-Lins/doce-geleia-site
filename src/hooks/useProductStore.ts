import { Category, Ingredient, Product } from "@/@types";
import { create } from "zustand";

async function getAllCategories(): Promise<Category[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
  );
  const categories = await response.json();
  return categories;
}

async function getAllIngredients(): Promise<Ingredient[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ingredients`,
  );
  const ingredients = await response.json();
  return ingredients;
}

async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
  );
  const products = await response.json();
  return products;
}

interface ProductStore {
  showModalEditProduct: boolean;
  setShowModalEditProduct: (showModalEditProduct: boolean) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
}
export const useProductStore = create<ProductStore>((set, get) => {
  getAllCategories().then((categories) => set({ categories }));
  getAllIngredients().then((ingredients) => set({ ingredients }));
  getAllProducts().then((products) => set({ products }));
  return {
    showModalEditProduct: false,
    setShowModalEditProduct: (showModalEditProduct) =>
      set({ showModalEditProduct }),
    categories: [],
    setCategories: (categories) => set({ categories }),
    ingredients: [],
    setIngredients: (ingredients) => set({ ingredients }),
    products: [],
    setProducts: (products) => set({ products }),
  };
});
