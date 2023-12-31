import { ProductList } from "@/components/ProductList";
import { Info } from "@/components/info";
import { Separator } from "@/components/ui/separator";
import { getAllProducts, getProduct } from "@/data/products";
import Image from "next/image";

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => {
    return { slug: product.slug };
  });
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  const products = await getAllProducts();

  return (
    <div className="mx-auto mt-20 flex min-h-screen max-w-5xl items-center justify-center sm:mt-10">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <div className="flex aspect-square items-center justify-center overflow-hidden sm:rounded-lg">
            <Image
              layout="responsive"
              width={500}
              height={500}
              src={product?.coverUrl ?? ""}
              alt="Image"
              sizes="(min-width: 1040px) 464px, calc(97.78vw - 25px)"
              className="object-cover object-center"
            />
          </div>

          <div className="mt-6 items-center px-4 sm:mt-16 sm:flex sm:h-full sm:px-0 lg:mt-0">
            <Info product={product} />
          </div>
        </div>
        <Separator className="mt-6" />
        <h2 className="mb-4 mt-10 text-center text-xl font-medium text-gray-900">
          Productos relacionados
        </h2>

        <ProductList products={products} />
      </div>
    </div>
  );
}
