"use client";
import { useOrderStore } from "@/hooks/useOrderStore";
import { AdminOrders } from "./AdminOrders";

interface AdminContentProps {
  order: any;
}

export function AdminContent({ order }: AdminContentProps) {
  const { showOrderHistory, showTestimonial } = useOrderStore();

  return (
    <div className="h-[calc(60vh)] w-full overflow-y-auto">
      {showOrderHistory && <AdminOrders order={order} />}
      {/* {showTestimonial && <div>AdminTestimonial</div>} */}
    </div>
  );
}
