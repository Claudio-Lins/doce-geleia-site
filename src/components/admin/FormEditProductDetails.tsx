"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Product } from "../../@types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const UpdateProductDetailSchema = z.object({
  productDetail: z.array(
    z.object({
      weight: z.number(),
      netWeight: z.number(),
      price: z.number(),
      qunatityInStock: z.number(),
      discount: z.number().optional(),
    }),
  ),
});

interface FormEditProductDetailsProps {
  product: Product | null;
}

type ProductDetailFormData = z.infer<typeof UpdateProductDetailSchema>;

export function FormEditProductDetails({
  product,
}: FormEditProductDetailsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductDetailFormData>({
    resolver: zodResolver(UpdateProductDetailSchema),
  });

  useEffect(() => {
    if (product?.productDetail) {
      product.productDetail.forEach((detail, index) => {
        setValue(`productDetail.${index}.weight`, Number(detail.weight));
        setValue(`productDetail.${index}.price`, Number(detail.price));
        setValue(
          `productDetail.${index}.qunatityInStock`,
          Number(detail.qunatityInStock),
        );
        setValue(`productDetail.${index}.discount`, Number(detail.discount!));
      });
    }
  }, [product, setValue]);

  async function handleUpdateFormProduct(data: ProductDetailFormData) {
    console.log(data);
  }
  const erros = Object.values(errors);
  console.table(erros);
  return (
    <Dialog>
      <DialogTrigger>Detalhes</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className=" text-2xl font-bold">
            {product?.title}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleUpdateFormProduct)}
          className=" border-t py-4"
        >
          <div className="flex w-full flex-wrap items-center justify-center gap-2">
            {product?.productDetail.map((detail, index) => {
              return (
                <Card key={detail.id} className="max-w-xs">
                  <CardHeader>
                    <CardTitle>{detail.weight}g</CardTitle>
                  </CardHeader>
                  <CardContent className="max-w-xs">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Label>Peso Bruto</Label>
                        <Input
                          type="number"
                          id={`detail[${index}].weight`}
                          {...register(`productDetail.${index}.weight`)}
                          defaultValue={Number(detail.weight.toString())}
                        />

                        <span>gr</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label>Preço</Label>
                        <Input
                          type="number"
                          id="price"
                          {...register(`productDetail.${index}.price`)}
                          defaultValue={Number(detail.price.toString())}
                        />
                        <span>€</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label>Quantidade</Label>
                        <Input
                          type="number"
                          id="qunatityInStock"
                          {...register(
                            `productDetail.${index}.qunatityInStock`,
                          )}
                          defaultValue={Number(
                            detail.qunatityInStock.toString(),
                          )}
                        />
                        <span>Unid.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label>Desconto</Label>
                        <Input
                          type="number"
                          id="discount"
                          {...register(`productDetail.${index}.discount`)}
                          defaultValue={Number(detail.discount ?? 0)}
                        />
                        <span>%</span>
                      </div>
                    </div>
                  </CardContent>
                  <Separator className="mx-auto mb-4 w-[90%]" />
                  {/* <CardFooter className="flex w-full items-center justify-between gap-2">
                      <Button
                        size={"sm"}
                        className="ml-auto flex items-center gap-2"
                        variant="destructive"
                      >
                        <span>Deletar</span>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter> */}
                </Card>
              );
            })}
          </div>
          <div className="w-full">
            <button type="submit">Salvarrrrr</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
