"use client";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex h-[100px] w-[100px] cursor-pointer flex-col justify-center space-y-1 rounded-md border px-2 py-1 text-center text-[10px] leading-3 shadow-sm transition-all duration-200 hover:scale-110">
      <Link className="mx-auto" href={`/products/${product.slug}`}>
        <Image
          src={product.coverUrl}
          alt={product.title}
          width={50}
          height={50}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className=""
        />
      </Link>
      <Separator />
      <div className="flex h-[25px] w-full items-center justify-center">
        <strong>{product.title}</strong>
      </div>
    </div>
  );
}
