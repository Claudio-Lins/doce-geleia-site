import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
// resolver
const UserTestimonialSchema = z.object({
  name: z.string(),
  testimonial: z.string(),
  email: z.string().optional(),
  imageUrl: z.string().optional(),
  published: z.boolean().optional(),
});

type UserTestimonialData = z.infer<typeof UserTestimonialSchema>;

export function UserTestimonial() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserTestimonialData>({
    resolver: zodResolver(UserTestimonialSchema),
    defaultValues: {
      name: session?.user?.name!,
      email: session?.user?.email!,
      testimonial: "",
      imageUrl: session?.user?.image ?? "",
      published: false,
    },
  });

  async function handleFormUserTestimonial(data: UserTestimonialData) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/testimonials`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) {
      toast.error("Erro ao enviar comentário!");
      return;
    }
    console.log(data);
    toast.success("Obrigado pelo seu comentário!");
    reset();
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">
        Comente aqui o que achou da Doce Geleia.
      </h1>
      <p className="text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia a,
        similique veritatis blanditiis odit quasi asperiores, explicabo!
      </p>
      <form className="-w-full flex flex-col space-y-4">
        <textarea
          className="mt-4 h-40 w-full rounded-lg border p-2"
          placeholder="Deixe aqui o seu comentário"
          {...register("testimonial", { required: true })}
        />
        <Button
          onClick={handleSubmit(handleFormUserTestimonial)}
          className="ml-auto w-2/5"
        >
          Enviar
        </Button>
      </form>
    </div>
  );
}
