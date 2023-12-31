"use client";
import { TestimonialTypes } from "@/@types";
import { useOrderStore } from "@/hooks/useOrderStore";
import { AdminOrders } from "./AdminOrders";
import { ContentAdminJams } from "./ContentAdminJams";
import { ContentAdminTestimonial } from "./ContentAdminTestimonial";

interface AdminContentProps {
  order: any;
  testimonial: TestimonialTypes[];
}

export function AdminContent({ order, testimonial }: AdminContentProps) {
  const { showOrderHistory, showTestimonial, showJams } = useOrderStore();

  return (
    <div className="h-[calc(70vh)] overflow-y-auto">
      {showOrderHistory && <AdminOrders order={order} />}
      {showTestimonial && <ContentAdminTestimonial testimonial={testimonial} />}
      {showJams && <ContentAdminJams />}
    </div>
  );
}
