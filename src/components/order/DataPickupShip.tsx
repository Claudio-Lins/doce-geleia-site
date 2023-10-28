"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { Separator } from "../ui/separator";

export function DataPickupShip() {
  const { isPickup, infoClient } = useCartStore();
  return (
    <div className="mt-4 h-48 w-full rounded-lg border-[1px] p-2 text-xs text-gray-500 print:w-1/2 md:w-1/2">
      <h3 className="mb-2 border-b text-lg font-bold text-gray-500">
        {isPickup ? "Dados da Recolha" : "Dados da Entrega"}
      </h3>
      <div className="flex items-center gap-1">
        <strong>Nome:</strong>
        <p className="text-sm">
          {isPickup ? "Doce Geleia" : infoClient.fullName}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <strong>Email:</strong>
        <p className="text-sm">
          {isPickup ? "docegeleia@gmail.com" : infoClient.email}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <strong>Telemóvel:</strong>
        <p className="text-sm">{isPickup ? "910 344 904" : infoClient.phone}</p>
      </div>
      <div className="flex items-center gap-1">
        <strong>Morada:</strong>
        <p className="text-sm">
          {isPickup ? "Estrada de Mem Martins, 168A" : infoClient.address}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <strong>Conselho:</strong>
        <p className="text-sm">{isPickup ? "Sintra" : infoClient.city}</p>
        <strong className="ml-2">Código posta:</strong>
        <p className="text-sm">
          {isPickup ? "2725-381" : infoClient.postalCode}
        </p>
      </div>
      <Separator className="my-1" />
      <div className="flex items-center gap-1">
        <strong>Nota:</strong>
        <p className="text-sm">
          {isPickup ? "Próximo ao Cruzeiro" : infoClient.observations}
        </p>
      </div>
    </div>
  );
}
