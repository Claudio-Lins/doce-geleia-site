"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
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
  const [countCaracteres, setCountCaracteres] = useState(0);
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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
    toast.success("Obrigado pelo seu comentário!");
    reset();
  }

  countCaracteres >= 300 && toast.error("Limite de caracteres excedido!");

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">
        Comente aqui o que achou da Doce Geleia.
      </h1>
      <form
        onSubmit={handleSubmit(handleFormUserTestimonial)}
        className="-w-full relative flex flex-col space-y-4">
        <textarea
          className="mt-4 h-48 w-full rounded-lg border p-2"
          placeholder="Deixe aqui o seu comentário"
          maxLength={300}
          {...register("testimonial")}
          onChange={(e) => setCountCaracteres(e.target.value.length)}
        />
        <Button
          type="submit"
          className="ml-auto w-2/5 flex justify-center items-center"
        >
          <span>Enviar</span>
          {isSubmitting && (
            <Loader className="animate-spin ml-2" size={20} color="#fff" />
          )}
        </Button>
        <div className="absolute bottom-16 right-3 text-sm text-zinc-500">
          {countCaracteres}/300
        </div>
      </form>
    </div>
  );
}
