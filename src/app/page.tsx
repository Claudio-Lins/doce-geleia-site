import { HeroText } from "@/components/Hero/HeroText";
import { Slider } from "@/components/Hero/Slider/Slider";
import { Testimonial } from "@/components/testimonials";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function Home() {
  const products = await prisma.product.findMany({
    include: {
      productDetail: true,
      category: true,
      ingredients: true,
    },
  });

  const testimonials = await prisma.testimonial.findMany({
    where: {
      published: true,
    },
  });

  return (
    <div className="">
      <div className=" flex min-h-screen w-full flex-col items-center justify-center bg-[url('/img01.jpg')] bg-cover bg-right bg-no-repeat">
        <div className=" absolute  min-h-screen w-full bg-zinc-950 opacity-70" />
        <div className="z-[1] flex min-h-screen w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-evenly">
          <HeroText />
          <div className="hidden md:block">
            <Slider numSlides={1} />
          </div>
        </div>
      </div>
      <Testimonial testimonials={testimonials} />
    </div>
  );
}
