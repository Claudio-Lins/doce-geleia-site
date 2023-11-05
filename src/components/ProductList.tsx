"use client";
import { Product } from "@/@types";
import { usePathname } from "next/navigation";
import { ProductCard } from "./_ProductCard";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const pathname = usePathname();
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {products
        .filter((product: Product) => product.isDestack === true)
        .filter((product: Product) => product.slug !== pathname.slice(10))
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}
