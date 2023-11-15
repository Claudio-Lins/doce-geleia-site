"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { ImageIcon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
// import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Input } from "../ui/input";

const ingredientSchema = z.object({
  name: z.string(),
  cor: z.string(),
  imageUrl: z.string(),
});

type IngredientData = z.infer<typeof ingredientSchema>;

interface FormCreateIngredientsModalProps {}

export function FormCreateIngredientsModal({}: FormCreateIngredientsModalProps) {
  const [imageUrlSelected, setImageUrlSelected] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IngredientData>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: "",
      cor: "",
      imageUrl: imageUrlSelected || "",
    },
  });

  useEffect(() => {
    setValue("imageUrl", imageUrlSelected);
  }, [imageUrlSelected, setValue]);

  async function handleCreateIngredient(
    event: React.FormEvent,
    data: IngredientData,
  ) {
    event.preventDefault();
    event.stopPropagation();
    alert(JSON.stringify(data));
    console.log(data);
    // rest of the code
  }

  function handleImageUrlSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;
    if (!files) {
      return;
    }
    const selectedFile = files[0];
    setImageUrlSelected(selectedFile as any);
    console.log(selectedFile.name);
  }

  return (
    <Dialog>
      <DialogTrigger className="h-auto w-full rounded-lg border py-2 hover:bg-zinc-100 hover:shadow-inner">
        <div className="flex h-full w-full items-center justify-center px-4">
          <Plus strokeWidth={0.75} className="h-6 w-6" />
          <span className="text-zinc-900">Ingrediente</span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>
            <span className="text-xl font-bold">Criar ingredientes</span>
          </DialogTitle>
          <form
            onSubmit={(event) =>
              handleSubmit((data) => handleCreateIngredient(event, data))(event)
            }
          >
            <DialogDescription className="border-b border-t py-6">
              <div className="flex flex-col space-y-4">
                <Input
                  type="text"
                  {...register("name")}
                  placeholder="Nome do ingrediente"
                  defaultValue=""
                />
                <div className="flex items-center gap-2">
                  <div className="w-1/2">
                    <Input
                      type="color"
                      {...register("cor")}
                      placeholder="Cor do ingrediente"
                    />
                  </div>
                  <div className=" w-1/2">
                    <label
                      htmlFor="imageUrl"
                      className="flex h-20 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed"
                    >
                      <ImageIcon
                        strokeWidth={1}
                        className="h-10 w-10 text-zinc-400"
                      />
                    </label>
                    <input
                      type="file"
                      id="imageUrl"
                      className="sr-only"
                      onChange={handleImageUrlSelected}
                    />
                  </div>
                </div>
              </div>
            </DialogDescription>
            <div className="flex w-full items-center justify-between gap-4">
              <DialogClose className="w-full">
                <Button
                  className="w-full"
                  type="button"
                  variant={"destructive"}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <button type="submit" className="w-full">
                Criar
              </button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
