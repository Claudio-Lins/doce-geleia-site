"use client";
import { Product, TestimonialTypes } from "@/@types";
import { useOrderStore } from "@/hooks/useOrderStore";
import { AdminOrders } from "./AdminOrders";
import { ContentAdminJams } from "./ContentAdminJams";
import { ContentAdminTestimonial } from "./ContentAdminTestimonial";

interface AdminContentProps {
  order: any;
  testimonial: TestimonialTypes[];
  products: Product[];
}

export function AdminContent({
  order,
  testimonial,
  products,
}: AdminContentProps) {
  const { showOrderHistory, showTestimonial, showJams } = useOrderStore();

  return (
    <div className="h-[calc(70vh)] overflow-y-auto">
      {showOrderHistory && <AdminOrders order={order} />}
      {showTestimonial && <ContentAdminTestimonial testimonial={testimonial} />}
      {showJams && <ContentAdminJams products={products} />}
    </div>
  );
}
