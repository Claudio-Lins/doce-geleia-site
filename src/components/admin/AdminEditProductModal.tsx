"use client";

import { Ingredient, Product } from "@/@types";
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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { AdminIngredientsModal } from "./AdminIngredientsModal";

interface AdminEditProductModalProps {
  produto: Product | null;
}

const formProductSchema = z.object({
  title: z.string().min(3, { message: "Título muito curto" }),
  slug: z.string().min(3, { message: "Slug muito curto" }),
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
      id: z.string(),
      weight: z.coerce.number(),
      netWeight: z.coerce.number(),
      price: z.coerce.number(),
      discount: z.coerce.number(),
      qunatityInStock: z.coerce.number(),
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
    // ingredients,
  } = useProductStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormProductData>({
    resolver: zodResolver(formProductSchema),
  });

  useEffect(() => {
    if (produto) {
      setValue("title", produto.title);
      setValue("category", produto.category.id);
      setValue("slug", produto.slug);
      setValue("harmonization", produto.harmonization ?? "");

      produto.productDetail.forEach((productDetail, index) => {
        setValue(`productDetail.${index}.id`, productDetail.id);
        setValue(`productDetail.${index}.weight`, productDetail.weight);
        setValue(`productDetail.${index}.netWeight`, productDetail.netWeight);
        setValue(`productDetail.${index}.price`, productDetail.price);
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
    const response = await fetch("/api/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: produto?.id,
        title: data.title,
        slug: data.title.toLowerCase().replace(/ /g, "-"),
        category: data.category,
        harmonization: data.harmonization,
        ingredients: selectedIngredients.map((ingredient) => ingredient.id),
        productDetail: data.productDetail.map((detail) => ({
          id: detail.id,
          weight: detail.weight,
          netWeight: detail.netWeight,
          price: detail.price,
          discount: detail.discount,
          qunatityInStock: detail.qunatityInStock,
        })),
      }),
    });
    if (response.ok) {
      toast.success("Produto atualizado com sucesso!");
      setShowModalEditProduct(false);
    } else {
      toast.error("Erro ao atualizar o Produto");
    }
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
        <form
          onSubmit={handleSubmit(handleFormProduct)}
          className="flex flex-col space-y-4"
        >
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
                      ingredients={produto?.ingredients || []}
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
                    {produto?.productDetail
                      .sort((a, b) => a.weight - b.weight)
                      .map((productDetail, index) => {
                        return (
                          <Card
                            key={productDetail.id}
                            className="w-full max-w-[200px]"
                          >
                            <CardHeader className="p-2">
                              <CardTitle className="text-lg">
                                {productDetail.weight}g
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2 px-2">
                              <div className="flex flex-col space-y-2">
                                <div className="flex items-center gap-2">
                                  <Label className="text-xs">Peso Liq.:</Label>
                                  <Input
                                    className="h-6 text-right text-xs "
                                    type="number"
                                    {...register(
                                      `productDetail.${index}.weight`,
                                    )}
                                    defaultValue={productDetail.weight}
                                  />

                                  <small className="text-xs font-medium">
                                    gr
                                  </small>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label className="text-xs">Peso Net.:</Label>
                                  <Input
                                    className="h-6 text-right text-xs "
                                    type="number"
                                    {...register(
                                      `productDetail.${index}.netWeight`,
                                    )}
                                    defaultValue={productDetail.netWeight}
                                  />
                                  <small className="text-xs font-medium">
                                    gr
                                  </small>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label className="text-xs">Estoque:</Label>
                                  <Input
                                    className="h-6 text-right text-xs "
                                    type="number"
                                    {...register(
                                      `productDetail.${index}.qunatityInStock`,
                                    )}
                                    defaultValue={productDetail.qunatityInStock}
                                  />
                                  <small className="text-xs font-medium">
                                    Unid.
                                  </small>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label className="text-xs">Preço:</Label>
                                  <Input
                                    className="h-6 text-right text-xs "
                                    type="number"
                                    {...register(
                                      `productDetail.${index}.price`,
                                    )}
                                    defaultValue={productDetail.price}
                                  />
                                  <small className="text-xs font-medium">
                                    €
                                  </small>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label className="text-xs">Desconto:</Label>
                                  <Input
                                    className="h-6 text-right text-xs "
                                    type="number"
                                    {...register(
                                      `productDetail.${index}.discount`,
                                    )}
                                    defaultValue={productDetail.discount || 0}
                                  />
                                  <small className="text-xs font-medium">
                                    %
                                  </small>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
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
            <Button size={"lg"} type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
