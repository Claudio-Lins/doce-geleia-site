export interface Product {
  id: string
  title: string
  slug: string
  coverUrl: string | null
  harmonization: string | null
  validate: string | null
  isDestack: boolean
  categoryId: string | null
  createdAt: Date
  productDetail: ProductDetail[]
  category: Category | null
  ingredients: Ingredient[]
}

export interface Category {
  id: string
  title: string
  description: string | null
  coverUrl: string | null
  createdAt: Date
}

export interface Ingredient {
  id: string
  name: string
  cor: string | null
  imageUrl: string | null
  createdAt: Date
}

export interface ProductDetail {
  id: string
  weight: string
  price: number
  qunatityInStock: number
  productId: string
  createdAt: Date
}
