"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProductStore } from "@/hooks/useProductStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { AdminIngredientsModal } from "./AdminIngredientsModal";

interface Category {
  id: string;
  title: string;
  description: string | null;
  coverUrl: string | null;
  createdAt: Date;
}
interface Ingredient {
  id: string;
  name: string;
  cor: string | null;
  imageUrl: string | null;
  createdAt: Date;
}

interface ProductDetail {
  id: string;
  weight: number;
  netWeight: number;
  discount?: number;
  price: number;
  qunatityInStock: number;
  productId: string;
  createdAt: Date;
}

interface AdminEditProductModalProps {
  produto: {
    id: string;
    title: string;
    slug: string;
    coverUrl: string | null;
    harmonization: string | null;
    validate: string | null;
    category: Category;
    isDestack: boolean;
    createdAt: Date;
    productDetail: ProductDetail[];
    ingredients: Ingredient[];
  } | null;
}

const formProductSchema = z.object({
  title: z.string(),
  category: z.string(),
  ingredients: z.array(z.string()),
  harmonization: z.string().optional(),
});

type FormProductData = z.infer<typeof formProductSchema>;

export function AdminEditProductModal({ produto }: AdminEditProductModalProps) {
  const [countCaracteres, setCountCaracteres] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );
  const {
    setShowModalEditProduct,
    showModalEditProduct,
    categories,
    ingredients,
  } = useProductStore();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormProductData>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      title: produto?.title,
      category: produto?.category.id,
      harmonization: produto?.harmonization || "",
      ingredients: produto?.ingredients.map((ingredient) => ingredient.name),
    },
  });
  useEffect(() => {
    setValue(
      "ingredients",
      selectedIngredients.map((ingredient) => ingredient.id),
    );
  }, [selectedIngredients, setValue]);

  async function handleFormProduct(data: FormProductData) {
    console.log(data);
  }

  countCaracteres >= 200 && toast.error("Limite de caracteres excedido!");
  return (
    <Dialog
      open={showModalEditProduct}
      onOpenChange={() => setShowModalEditProduct(false)}
    >
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {produto?.title}
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-[360px] w-[360px] items-center justify-center rounded-lg bg-white shadow-sm">
              <Image
                src={produto?.coverUrl ?? ""}
                alt={produto?.title ?? ""}
                width={500}
                height={500}
                sizes="(min-width: 1040px) 464px, calc(97.78vw - 25px)"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-2">
              <ScrollArea className="h-[360px] pb-4 pr-4">
                <div className="flex flex-col gap-2">
                  <div className="w-full">
                    <Input
                      className="focus:border-zinc-600 focus:ring-0"
                      placeholder={produto?.title}
                      defaultValue={produto?.title}
                      {...register("title")}
                    />
                  </div>
                  <div className=" flex items-center justify-between gap-2">
                    <select
                      className="h-10 w-1/2 rounded-lg border border-gray-300 bg-white p-2 text-sm  text-gray-500  focus:border-blue-300 focus:outline-none focus:ring"
                      {...register("category")}
                      defaultValue={produto?.category.id}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                    <span>ou</span>
                    <Button variant={"outline"} className="text-zinc-400">
                      Adicionar Categoria
                    </Button>
                  </div>
                  <Separator className="my-2" />
                  <div className="">
                    <AdminIngredientsModal
                      ingredients={ingredients}
                      onSave={setSelectedIngredients}
                      ingredientes={produto?.ingredients || []}
                    />
                  </div>
                  <Separator className="my-2" />
                  <div className="">
                    <Label htmlFor="harmonization">Combina com...</Label>
                    <Textarea
                      className="relative"
                      rows={5}
                      placeholder="Harmonização"
                      defaultValue={produto?.harmonization || ""}
                      {...register("harmonization")}
                      onChange={(e) =>
                        setCountCaracteres(e.target.value.length)
                      }
                    />
                    <div className="absolute bottom-6 right-6 text-sm text-zinc-500">
                      {countCaracteres}/200
                    </div>
                  </div>
                  <div className=""></div>
                </div>
              </ScrollArea>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex w-full items-center justify-end gap-4">
            <DialogClose>
              <Button size={"lg"} variant={"outline"} type="button">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose>
              <Button
                size={"lg"}
                type="submit"
                onClick={handleSubmit(handleFormProduct)}
              >
                Salvar
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
