import { Info } from "@/components/info"
import Image from "next/image"
import prisma from "@/lib/prisma"
import { ProductList } from "@/components/ProductList"
import { Separator } from "@/components/ui/separator"

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await prisma.product.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      productDetail: true,
      category: true,
      ingredients: true,
    },
  })

  const products = await prisma.product.findMany({
    include: {
      productDetail: true,
      category: true,
      ingredients: true,
    },
  })

  return (
    <div className="mt-20 sm:mt-10 min-h-screen flex items-center justify-center max-w-4xl mx-auto">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <div className="flex items-center justify-center sm:rounded-lg overflow-hidden">
            <Image
              width={400}
              height={300}
              src={product?.coverUrl ?? ""}
              alt="Image"
              className="object-cover object-center"
            />
          </div>

          <div className="mt-6 px-4 sm:mt-16 sm:px-0 lg:mt-0 sm:h-full sm:flex items-center">
            <Info product={product} />
          </div>
        </div>
        <Separator className="mt-6" />
        <h2 className="text-gray-900 text-xl text-center font-medium mt-10 mb-4">
          Productos relacionados
        </h2>
        {/* @ts-ignore */}
        <ProductList products={products} />
      </div>
    </div>
  )
}
