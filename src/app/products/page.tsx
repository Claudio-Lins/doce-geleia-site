import { Product } from "@/@types";
import { ProductCard } from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api";

async function getAllProducts(): Promise<Product[]> {
  const response = await api("/products", { next: { revalidate: 1 } });
  const products = await response.json();
  return products;
}

export default async function Products() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col justify-center px-2 pb-12 pt-24 sm:p-0 md:h-screen">
      <h1 className="text-2xl font-bold">Sabores</h1>
      <span>Escolha aqui os sabores</span>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center gap-4 md:mt-10 md:gap-10">
        {products
          .filter((product) => product.isDestack === true)
          .map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
}
