"use client";
import { SelectedProduct } from "@/@types";
import { useCartStore } from "@/hooks/useCartStore";
import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { SplashDiscount } from "./SplashDiscount";
import Currency from "./currency";
import { Deadline } from "./shipping/Deadline";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface ProductOption {
  id: string;
  price: number;
  weight: number;
  netWeight: number;
  discount: number;
  qunatityInStock: number;
}

function CartItem({
  product,
  detail,
}: {
  product: any;
  detail: ProductOption;
}) {
  const { addItem, items, removeItem } = useCartStore();
  const [hasDiscount, setHasDiscount] = useState(false);
  const [isInStock, setIsInStock] = useState(false);

  useEffect(() => {
    if (detail.discount > 0) {
      setHasDiscount(true);
    }
    detail.qunatityInStock === 0 ? setIsInStock(false) : setIsInStock(true);
  }, [detail.discount, detail.qunatityInStock, isInStock]);

  return (
    <div className="relative flex w-28 flex-col justify-between gap-1 rounded-md border p-2">
      {hasDiscount && <SplashDiscount discount={detail.discount} />}
      <span className="text-xs">{detail.weight}gr</span>
      <div className="text-sm font-bold">
        <Currency value={detail.price / 100} />
      </div>
      <div className="flex items-center justify-center">
        <button onClick={() => removeItem(product.id, detail.weight)}>
          <MinusCircle />
        </button>
        <div className="w-8 text-center">
          {items.find(
            (item: SelectedProduct) =>
              item.id === product.id && item.weight === detail.weight,
          )?.quantity !== undefined
            ? items.find(
                (item: SelectedProduct) =>
                  item.id === product.id && item.weight === detail.weight,
              )?.quantity
            : 0}
        </div>
        <button
          onClick={() =>
            addItem({
              ...product,
              price: detail.price,
              weight: detail.weight,
              netWeight: detail.netWeight,
            })
          }
        >
          <PlusCircle />
        </button>
      </div>
      {<Deadline isInStock={detail.qunatityInStock > 0 ? true : false} />}
    </div>
  );
}

export function Info({ product }: any) {
  const { addItem, items, removeItem, totalItems, setShowCart } =
    useCartStore();
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{product?.title}</h1>
      <small>{product?.category?.title}</small>
      <hr className="my-4" />
      <h3 className="font-semibold text-black">Ingredients:</h3>
      <div className="mb-4 mt-2 flex flex-wrap items-center gap-2">
        {product?.ingredients?.map((ingredient: any) => (
          <span key={ingredient.id} className="text-xs">
            {ingredient.name}
          </span>
        ))}
      </div>
      <Separator className="my-4" />
      <div>
        <h3 className="font-semibold text-black">Vai bem com:</h3>
        <p className="text-xs leading-relaxed tracking-wider">
          {product?.harmonization}
        </p>
      </div>
      <Separator className="my-4" />

      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col">
          <h2 className="font-semibold text-black">Adicione ao carrinho</h2>
          <div className="mt-2 flex items-center justify-evenly gap-2">
            {product?.productDetail
              .sort((a: ProductOption, b: ProductOption) => a.price - b.price)
              ?.map((detail: ProductOption) => (
                <CartItem key={detail.id} product={product} detail={detail} />
              ))}
          </div>
          {totalItems > 0 && (
            <Button
              onClick={() => setShowCart(true)}
              className="mt-4 flex w-full items-center gap-2"
            >
              <span>Adicionado ao</span> <ShoppingCart size={16} />
              {totalItems}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
