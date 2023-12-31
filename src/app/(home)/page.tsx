import { TestimonialTypes } from "@/@types";
import { HeroText } from "@/components/Hero/HeroText";
import { Slider } from "@/components/Hero/Slider/Slider";
import { Testimonial } from "@/components/Testimonial";
import { api } from "@/lib/api";

async function getAllTestimonials(): Promise<TestimonialTypes[]> {
  const response = await api("/testimonials", { next: { revalidate: 1 } });
  const testimonials = await response.json();
  return testimonials;
}

export default async function Home() {
  const testimonials = await getAllTestimonials();

  return (
    <div className="">
      <div className=" flex min-h-screen w-full flex-col items-center justify-center bg-[url('/img01.jpg')] bg-cover bg-right bg-no-repeat">
        <div className=" absolute  min-h-screen w-full bg-zinc-950 opacity-50" />
        <div className="z-[1] mt-0 flex min-h-screen w-full flex-col items-center justify-center md:flex-row md:justify-evenly">
          <HeroText />
          <div className="hidden md:block">
            <Slider numSlides={1} />
          </div>
        </div>
      </div>
      <div className=""></div>
      <Testimonial testimonials={testimonials} />
    </div>
  );
}
