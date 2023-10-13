"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { cn } from "@/lib/utils";

export function BtnToggleShip() {
  const {
    setShippingPrice,
    shippingPrice,
    subTotalPrice,
    totalShippingPrice,
    isPickup,
    setIsPickup,
    setTotalShippingPrice,
  } = useCartStore();

  function toggleShip() {
    setIsPickup(!isPickup);
  }

  return (
    <div className=" relative border rounded-full overflow-hidden">
      <div
        className="absolute w-full flex items-center font-bold justify-center p-2 gap-1  cursor-pointer"
        onClick={toggleShip}
      >
        <p
          className={cn(
            "w-1/2 text-center text-sm",
            isPickup ? "text-zinc-50" : "text-zinc-300"
          )}
        >
          Recolha
        </p>
        <p
          className={cn(
            "w-1/2 text-center text-sm",
            isPickup ? "text-zinc-300" : "text-zinc-50"
          )}
        >
          Entrega
        </p>
      </div>
      <div
        className={cn(
          " w-1/2 h-10 transition-all duration-500 bg-zinc-900",
          isPickup ? " ml-0" : " ml-auto"
        )}
      />
    </div>
  );
}
