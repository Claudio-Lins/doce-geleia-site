import { HeroText } from "@/components/Hero/HeroText"
import { Slider } from "@/components/Hero/Slider/Slider"
import { ModalProducts } from "@/components/modals/ModalProducts"
import { Testimonial } from "@/components/testimonials"
import prisma from "@/lib/prisma"

export const revalidate = 0

export default async function Home() {
  const products = await prisma.product.findMany({
    include: {
      productDetail: true,
      category: true,
      ingredients: true,
    },
  })

  const testimonials = await prisma.testimonial.findMany({
    where: {
      published: true,
    },
  })

  return (
    <div className="">
      <div className=" bg-[url('/img01.jpg')] min-h-screen w-full flex flex-col bg-no-repeat bg-cover bg-right justify-center items-center">
        <div className=" absolute  bg-zinc-950 w-full min-h-screen opacity-70" />
        <div className="w-full z-[1] min-h-screen items-center justify-center flex flex-col md:flex-row md:justify-evenly gap-4">
          <HeroText />
          <div className="hidden md:block">
            <Slider numSlides={1} />
          </div>
        </div>
      </div>
      <Testimonial testimonials={testimonials} />
      {/* <ModalProducts products={products} /> */}
    </div>
  )
}
