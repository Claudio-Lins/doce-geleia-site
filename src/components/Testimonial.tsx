import { TestimonialTypes } from "@/@types";
import { SliderTestimonial } from "./testimonials/SliderTestimonial/SliderTestimonial";
import { Separator } from "./ui/separator";

interface TestimonialProps {
  testimonials: TestimonialTypes[];
}

export function Testimonial({ testimonials }: TestimonialProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-20">
      <h2 className="mb-8 font-oldStandardTT text-4xl font-bold uppercase">
        O QUE ANDAM DIZENDO DA Doce Geleia POR AÍ
      </h2>
      <Separator />
      <SliderTestimonial numSlides={1} testimonials={testimonials} />
    </div>
  );
}
