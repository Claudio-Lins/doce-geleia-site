import { Category, Ingredient } from "@/@types";
import { create } from "zustand";

async function getAllCategories(): Promise<Category[]> {
  const response = await fetch(`/api/categories`);
  const categories = await response.json();
  return categories;
}

async function getAllIngredients(): Promise<Ingredient[]> {
  const response = await fetch(`/api/ingredients`);
  const ingredients = await response.json();
  return ingredients;
}

interface ProductStore {
  showModalEditProduct: boolean;
  setShowModalEditProduct: (showModalEditProduct: boolean) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
}
export const useProductStore = create<ProductStore>((set, get) => {
  getAllCategories().then((categories) => set({ categories }));
  getAllIngredients().then((ingredients) => set({ ingredients }));
  return {
    showModalEditProduct: false,
    setShowModalEditProduct: (showModalEditProduct) =>
      set({ showModalEditProduct }),
    categories: [],
    setCategories: (categories) => set({ categories }),
    ingredients: [],
    setIngredients: (ingredients) => set({ ingredients }),
  };
});
