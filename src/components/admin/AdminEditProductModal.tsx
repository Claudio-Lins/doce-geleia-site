"use client";

import { Product } from "@/@types";
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

interface AdminEditProductModalProps {
  produto: Product | null;
}

const formProductSchema = z.object({
  title: z.string().min(3, { message: "Título muito curto" }),
  category: z.string(),
  ingredients: z.array(
    z.string().min(1, { message: "Selecione um ingrediente" }),
  ),
  harmonization: z
    .string()
    .min(10, { message: "Harmonização muito curta" })
    .max(200, { message: "Harmonização muito longa" }),
  productDetail: z.array(
    z.object({
      weight: z.number().min(1, { message: "Peso inválido" }),
      netWeight: z.number().min(1, { message: "Peso inválido" }),
      price: z.number().min(1, { message: "Preço inválido" }),
      discount: z.number().min(0, { message: "Desconto inválido" }),
      qunatityInStock: z.number().min(0, { message: "Quantidade inválida" }),
    }),
  ),
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
    formState: { errors },
    setValue,
  } = useForm<FormProductData>({
    resolver: zodResolver(formProductSchema),
    // defaultValues: {
    //   title: produto?.title,
    //   category: produto?.category.id,
    //   harmonization: produto?.harmonization ?? "",
    //   ingredients: produto?.ingredients.map((ingredient) => ingredient.name),
    // },
  });

  useEffect(() => {
    if (produto) {
      setValue("title", produto.title);
      setValue("category", produto.category.id);
      setValue("harmonization", produto.harmonization ?? "");

      produto.productDetail.forEach((productDetail, index) => {
        setValue(`productDetail.${index}.weight`, productDetail.weight);
        setValue(`productDetail.${index}.netWeight`, productDetail.netWeight);
        setValue(`productDetail.${index}.price`, productDetail.price / 100);
        setValue(
          `productDetail.${index}.discount`,
          productDetail.discount || 0,
        );
        setValue(
          `productDetail.${index}.qunatityInStock`,
          productDetail.qunatityInStock,
        );
      });

      setValue(
        "ingredients",
        produto.ingredients.map((ingredient) => ingredient.name),
      );
    }
  }, [produto, setValue]);

  async function handleFormProduct(data: FormProductData) {
    alert(JSON.stringify(data, null, 2));
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
                  <div className="flex w-full flex-col space-y-1">
                    <input
                      className="h-10 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-500 focus:border-zinc-600  focus:ring-0"
                      {...register("title")}
                    />
                    {errors.title && (
                      <span className="text-[10px] text-red-500">
                        {errors.title.message}
                      </span>
                    )}
                  </div>
                  <div className=" flex items-center justify-between gap-2">
                    <select
                      className="h-10 w-1/2 rounded-lg border border-gray-300 bg-white p-2 text-sm  text-gray-500  focus:border-blue-300 focus:outline-none focus:ring"
                      {...register("category")}
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
                  <div className="relative">
                    <Label htmlFor="harmonization">Combina com...</Label>
                    <Textarea
                      className=""
                      rows={5}
                      // placeholder="Harmonização"
                      {...register("harmonization")}
                      onChange={(e) =>
                        setCountCaracteres(e.target.value.length)
                      }
                    />
                    <div className="absolute bottom-2 right-4 text-sm text-zinc-500">
                      {countCaracteres}/200
                    </div>
                  </div>
                  <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-lg border p-2">
                    {produto?.productDetail.map((productDetail, index) => {
                      return (
                        <div
                          key={productDetail.id}
                          className="flex h-32 w-32 flex-col space-y-2 rounded-md border p-2"
                        >
                          <div className="flex w-full items-center space-x-1">
                            <span className="text-xs text-gray-500">Liq.:</span>
                            <input
                              type="number"
                              {...register(`productDetail.${index}.weight`)}
                              className="h-full w-[25px] text-right text-xs text-gray-500 focus:outline-none focus:ring-0"
                            />
                            <span className="text-xs text-gray-500">gr</span>
                          </div>
                          <div className="flex w-full items-center space-x-1">
                            <span className="text-xs text-gray-500">Net.:</span>
                            <input
                              type="number"
                              {...register(`productDetail.${index}.netWeight`)}
                              className="h-full w-[25px] text-right text-xs text-gray-500 focus:outline-none focus:ring-0"
                            />
                            <span className="text-xs text-gray-500">gr</span>
                          </div>
                          <div className="flex w-full items-center space-x-1">
                            <span className="text-xs text-gray-500">
                              Stock:
                            </span>
                            <input
                              type="number"
                              {...register(
                                `productDetail.${index}.qunatityInStock`,
                              )}
                              className="h-full w-[20px] text-xs text-gray-500 focus:outline-none focus:ring-0"
                            />
                          </div>
                          <div className="flex w-full items-center space-x-1">
                            <span className="text-xs text-gray-500">
                              Preço:
                            </span>
                            <input
                              type="number"
                              {...register(`productDetail.${index}.price`)}
                              className="h-full w-[25px] text-right text-xs text-gray-500 focus:outline-none focus:ring-0"
                            />
                            <span className="text-xs text-gray-500">€</span>
                          </div>
                          <div className="flex w-full items-center space-x-1">
                            <span className="text-xs text-gray-500">
                              Desconto:
                            </span>
                            <input
                              type="number"
                              {...register(`productDetail.${index}.discount`)}
                              className="h-full w-[20px] text-right text-xs text-gray-500 focus:outline-none focus:ring-0"
                            />
                            <span className="text-xs text-gray-500">%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
