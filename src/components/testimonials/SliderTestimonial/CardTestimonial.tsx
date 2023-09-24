import Image from "next/image"

interface CardInstagramProps {
  img: string
  alt: string
  name: string
  testimonial: string
}

export function CardTestimonial({
  img,
  alt,
  testimonial,
  name,
}: CardInstagramProps) {
  return (
    <div className="flex w-full max-w-xs flex-col items-center justify-center rounded-lg pt-24 relative">
      <Image
        src={img}
        alt={alt}
        width={100}
        height={100}
        className="rounded-full absolute top-12"
      />
      <div className="bg-zinc-50 w-full pt-16 pb-6 px-4">
        <p className="text-sm text-center italic leading-relaxed">
          {testimonial}
        </p>
        <span className="italic block font-light text-sm mt-4 w-full text-right">
          {name}
        </span>
      </div>
      <div className="flex h-16 w-full items-center rounded-b-lg bg-gray-50 pl-4" />
    </div>
  )
}
