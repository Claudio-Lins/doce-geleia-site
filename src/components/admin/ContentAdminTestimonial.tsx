"use client";
import { TestimonialTypes } from "@/@types";
import { useState } from "react";
import toast from "react-hot-toast";
import { CardAdminTestimonial } from "./CardAdminTestimonial";

interface ContentAdminTestimonialProps {
  testimonial: TestimonialTypes[];
}

export function ContentAdminTestimonial({
  testimonial,
}: ContentAdminTestimonialProps) {
  const [testimonials, setTestimonials] = useState(testimonial);

  async function togglePublished(id: string) {
    const testimonial = testimonials.find((t) => t.id === id);
    if (!testimonial) {
      return;
    }
    const response = await fetch("/api/testimonials/all-testimonials", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        published: !testimonial?.published,
      }),
    });

    if (response.ok) {
      toast.success("Testemunho atualizado com sucesso!");
      setTestimonials(
        testimonials.map((t) =>
          t.id === id ? { ...t, published: !t.published } : t,
        ),
      );
    } else {
      toast.error("Erro ao atualizar o testemunho");
    }
  }
  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {testimonials.map((testimonial) => (
        <CardAdminTestimonial
          key={testimonial.id}
          testimonial={testimonial}
          onTogglePublished={togglePublished}
        />
      ))}
    </div>
  );
}
