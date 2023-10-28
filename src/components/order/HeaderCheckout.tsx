"use client";

import { InfoClient, SelectedProduct } from "@/@types";
import { useCartStore } from "@/hooks/useCartStore";
import { createOrderNumber } from "@/utils/useCreateOrderNumber";
import { useEffect, useState } from "react";

export function HeaderCheckout() {
  const [client, setClient] = useState({} as InfoClient);
  const [itemsSelected, setItemsSelected] = useState([] as SelectedProduct[]);
  const [isPortugal, setIsPortugal] = useState(false);
  const {
    showModalOrder,
    setShowModalOrder,
    infoClient,
    items,
    totalItems,
    totalWeight,
    subTotalPrice,
    shippingPrice,
    removeItem,
    addItem,
    setOrderNumber,
    orderNumber,
  } = useCartStore();

  useEffect(() => {
    setItemsSelected(items);
    setClient(infoClient);
    setOrderNumber(createOrderNumber());
  }, [items, infoClient, setOrderNumber]);

  return (
    <header className="fixed z-10 w-full max-w-6xl border-b bg-white px-2 pb-2 md:px-0 ">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-3xl font-bold ">{client?.fullName},</h1>
          <span>Resumo da compra</span>
        </div>
        <span>
          <strong>Número do pedido: </strong>
          {orderNumber.slice(-7, -3) + " " + orderNumber.slice(-3)}
        </span>
      </div>
    </header>
  );
}
