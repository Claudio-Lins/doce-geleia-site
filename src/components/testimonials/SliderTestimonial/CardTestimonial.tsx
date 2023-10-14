import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CardInstagramProps {
  img: string;
  alt: string;
  name: string;
  testimonial: string;
}

export function CardTestimonial({
  img,
  alt,
  testimonial,
  name,
}: CardInstagramProps) {
  function getFirstLetters(str: string) {
    const words = str.split(" ");
    let firstLetters = "";
    for (let i = 0; i < words.length; i++) {
      if (i < 2) {
        firstLetters += words[i].charAt(0);
      }
    }
    return firstLetters;
  }
  return (
    <div className="flex w-full max-w-xs flex-col items-center justify-center rounded-lg pt-24 relative">
      <Avatar className="absolute top-12 w-20 h-20">
        <AvatarImage src={img} />
        <AvatarFallback className="font-bold text-xl">
          {getFirstLetters(name)}
        </AvatarFallback>
      </Avatar>

      <div className="bg-zinc-50 w-full pt-16 pb-6 px-4 h-60">
        <p className="text-sm text-center italic leading-relaxed">
          {testimonial}
        </p>
        <span className="italic block font-light text-sm mt-4 w-full text-right">
          {name}
        </span>
      </div>
      <div className="flex h-16 w-full items-center rounded-b-lg bg-gray-50 pl-4" />
    </div>
  );
}
