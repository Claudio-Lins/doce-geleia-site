import { TestimonialTypes } from "@/@types";
import { HeroText } from "@/components/Hero/HeroText";
import { Slider } from "@/components/Hero/Slider/Slider";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api";

async function getAllTestimonials(): Promise<TestimonialTypes[]> {
  const response = await api("/testimonials");
  const testimonials = await response.json();
  return testimonials;
}

export default async function Home() {
  const testimonials = await getAllTestimonials();
  // const testimonials = await prisma.testimonial.findMany({
  //   where: {
  //     published: true,
  //   },
  // });
  return (
    <div className="">
      <div className=" flex min-h-screen w-full flex-col items-center justify-center bg-[url('/img01.jpg')] bg-cover bg-right bg-no-repeat">
        <div className=" absolute  min-h-screen w-full bg-zinc-950 opacity-70" />
        <div className="z-[1] mt-0 flex min-h-screen w-full flex-col items-center justify-center md:flex-row md:justify-evenly">
          <HeroText />
          <div className="hidden md:block">
            <Slider numSlides={1} />
          </div>
        </div>
      </div>
      <div className=""></div>
      {/* <Testimonial testimonials={testimonials} /> */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-20">
        <h2 className="mb-8 font-oldStandardTT text-4xl font-bold uppercase">
          O QUE ANDAM DIZENDO DA Doce Geleia POR AÍ
        </h2>
        <Separator />
        {/* <SliderTestimonial numSlides={1} testimonials={testimonials} /> */}
        {testimonials.map((testimonial) => {
          return (
            <div
              key={testimonial.id}
              className="flex flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={testimonial.imageUrl ?? ""}
                  alt={testimonial.name}
                  className="h-20 w-20 rounded-full"
                />
                <h3 className="text-xl font-bold">{testimonial.name}</h3>
                <p className="text-center">{testimonial.testimonial}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
