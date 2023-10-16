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
    <header className="border-b pb-2 px-2 md:px-0 fixed w-full max-w-6xl bg-white z-10 ">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-3xl font-bold ">
            {client?.firstName} {client.lastName},
          </h1>
          <span>Resumo da compra</span>
        </div>
        <span>
          <strong>Número do pedido: </strong>
          {orderNumber}
        </span>
      </div>
    </header>
  );
}
