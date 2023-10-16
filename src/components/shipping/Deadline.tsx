"use client";
interface HoverCardProps {
  isInStock: boolean;
}

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AlertCircle } from "lucide-react";

export function Deadline({ isInStock }: HoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger className="mt-1 cursor-pointer">
        {isInStock ? (
          <span className="text-[10px] block text-center w-full">
            4 - 5 dias
          </span>
        ) : (
          <div className="flex items-center gap-1 justify-center">
            <span className="text-[10px] block text-center font-bold text-red-600">
              8 - 10 dias
            </span>
            <AlertCircle className="w-3 h-3 text-rose-600" />
          </div>
        )}
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <span className="text-sm">Prazo de entrega</span>
          <span className="text-xs">
            {isInStock
              ? "O seu produto será enviado em 4 a 5 dias úteis após a confirmação do pagamento."
              : "O seu produto será enviado em 8 a 10 dias úteis após a confirmação do pagamento."}
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
