import { TestimonialTypes } from "@/@types";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface CardAdminTestimonialProps {
  testimonial: TestimonialTypes;
  onTogglePublished: (id: string) => void;
}

export function CardAdminTestimonial({
  testimonial,
  onTogglePublished,
}: CardAdminTestimonialProps) {
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
    <div className="relative flex w-full max-w-xs flex-col items-center justify-center rounded-lg pt-24">
      <Avatar className="absolute top-12 h-20 w-20">
        <AvatarImage src={testimonial.imageUrl ?? ""} />
        <AvatarFallback className="text-xl font-bold">
          {getFirstLetters(testimonial.name)}
        </AvatarFallback>
      </Avatar>

      <div className="h-60 w-full bg-zinc-50 px-4 pb-6 pt-16">
        <p className="text-center text-sm italic leading-relaxed">
          {testimonial.testimonial}
        </p>
        <span className="mt-4 block w-full text-right text-sm font-light italic">
          {testimonial.name}
        </span>
      </div>
      <div className="absolute bottom-4 flex items-center space-x-2">
        <Switch
          id="published"
          checked={testimonial.published}
          onChange={() => onTogglePublished(testimonial.id)}
          onClick={() => onTogglePublished(testimonial.id)}
        />
        <Label htmlFor="published">Publicado</Label>
      </div>
      <div className="flex h-16 w-full items-center rounded-b-lg bg-gray-50 pl-4" />
    </div>
  );
}
