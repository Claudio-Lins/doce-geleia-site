"use client";

import { TestimonialTypes } from "@/@types";
import "swiper/css";
import "swiper/css/pagination";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { CardTestimonial } from "./CardTestimonial";

interface SliderProps {
  numSlides: number;
  testimonials: TestimonialTypes[];
}

export function SliderTestimonial({ numSlides, testimonials }: SliderProps) {
  const settings: SwiperProps = {
    spaceBetween: 0,
    slidesPerView: numSlides,
    navigation: true,
    pagination: {
      clickable: true,
    },
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    draggable: true,
  };
  return (
    <Swiper
      className="flex w-full max-w-xs flex-col"
      modules={[Autoplay, Navigation, Pagination, A11y]}
      {...settings}
      style={{
        // @ts-ignore
        "--swiper-pagination-color": "#FFBA08",
        "--swiper-pagination-bullet-inactive-color": "#d1cece",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "8px",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
      }}
    >
      {testimonials
        .filter((testimonial) => testimonial.published)
        .map((testimonial) => {
          return (
            <SwiperSlide key={testimonial.id}>
              <CardTestimonial
                img={testimonial.imageUrl ?? ""}
                alt={testimonial.name}
                name={testimonial.name}
                testimonial={testimonial.testimonial}
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
