"use client";
import { TestimonialTypes } from "@/@types";
import { useOrderStore } from "@/hooks/useOrderStore";
import { AdminOrders } from "./AdminOrders";
import { ContentAdminTestimonial } from "./ContentAdminTestimonial";

interface AdminContentProps {
  order: any;
  testimonial: TestimonialTypes[];
}

export function AdminContent({ order, testimonial }: AdminContentProps) {
  const { showOrderHistory, showTestimonial } = useOrderStore();

  return (
    <div className="h-[calc(60vh)] w-full overflow-y-auto">
      {showOrderHistory && <AdminOrders order={order} />}
      {showTestimonial && <ContentAdminTestimonial testimonial={testimonial} />}
    </div>
  );
}
