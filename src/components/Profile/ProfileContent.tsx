"use client";
import { useOrderStore } from "@/hooks/useOrderStore";
import { OrderHistory } from "./OrderHistory";
import { UserTestimonial } from "./UserTestimonial";

export function ProfileContent() {
  const { showOrderHistory, showTestimonial } = useOrderStore();
  return (
    <div className="h-[calc(60vh)] w-full">
      {showOrderHistory && <OrderHistory />}
      {showTestimonial && <UserTestimonial />}
    </div>
  );
}
