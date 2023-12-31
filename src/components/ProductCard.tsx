"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${product?.slug}`);
  };
  return (
    <div
      onClick={handleClick}
      className="group relative flex h-[205px] w-[170px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border shadow-md"
    >
      <div className="relative h-[153px] w-[127px] ">
        <Image
          src={product?.coverUrl}
          alt={product?.title}
          fill
          quality={100}
          className=" flex aspect-auto transform-gpu items-center justify-center object-contain  transition-all duration-500 ease-in-out hover:scale-110 group-hover:scale-110"
        />
      </div>

      <div className="font-Montserrat absolute bottom-0 flex h-[45px] w-full items-center justify-center border-t border-white bg-zinc-900 px-2 text-center text-xs leading-4 text-white">
        {product?.title}
      </div>
    </div>
  );
}
