"use client"

import { Product } from "@/@types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import ModalContexts from "./use-modal-store"
import Image from "next/image"
import { Separator } from "../ui/separator"
import { ProductSize } from "../ProductSize"
// import { Product } from "@prisma/client"

interface ModalProductsProps {
  products: Product[]
}

export function ModalProducts({ products }: ModalProductsProps) {
  const { showModalProducts, setShowModalProducts } = ModalContexts()
  return (
    <Dialog
      open={showModalProducts}
      onOpenChange={() => setShowModalProducts(false)}
    >
      <DialogContent
        className="bg-white w-full max-w-6xl mx-auto rounded-lg"
        aria-label="Produtos Doce Geleia"
      >
        <DialogHeader>
          <DialogTitle>
            <h1 className="font-bold text-2xl">Produtos Doce Geleia</h1>
          </DialogTitle>
          <Separator />
          <DialogDescription>
            <div className="flex flex-wrap items-center justify-evenly gap-2 mt-6">
              {products.map((product) => (
                <div key={product.id}>
                  <div className="max-w-sm w-full flex flex-col rounded-lg border p-4">
                    <h1 className="font-bold text-left text-zinc-950 text-lg">
                      {product.title}
                    </h1>
                    <Separator />
                    <div className="flex items-center mt-4">
                      <div className="w-24">
                        <Image
                          src="/assets/product-01.png"
                          alt="Product"
                          width={71}
                          height={79}
                          className="bg-cover"
                        />
                      </div>
                      <div className="flex-1 flex items-center justify-evenly gap-4">
                        {product.productDetail.map((detail) => (
                          <ProductSize
                            key={detail.id}
                            weight={detail.weight}
                            price={detail.price}
                            quantity={0}
                            setQuantity={() => {}}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
