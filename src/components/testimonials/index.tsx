import { SliderTestimonial } from "./SliderTestimonial/SliderTestimonial"
import { Separator } from "../ui/separator"
import { Testimonial } from "@prisma/client"

interface TestimonialProps {
  testimonials: Testimonial[]
}

export function Testimonial({ testimonials }: TestimonialProps) {
  return (
    <div className="w-full py-20 px-4 flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold mb-8 uppercase font-oldStandardTT">
        O QUE ANDAM DIZENDO DA Doce Geleia POR AÍ
      </h2>
      <Separator />
      <SliderTestimonial numSlides={1} testimonials={testimonials} />
    </div>
  )
}
