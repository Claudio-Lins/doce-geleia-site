import { Ingredient } from "@/@types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface AdminIngredientsModalProps {
  selected: Ingredient[];
  setSelected: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  productIngredients: Ingredient[];
  setProductIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

export function AdminIngredientsModal({
  selected,
  setSelected,
  productIngredients,
  setProductIngredients,
}: AdminIngredientsModalProps) {
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ingredients`)
      .then((res) => res.json())
      .then((data) => {
        setAllIngredients(data);
      });
  }, []);

  return (
    <Dialog>
      <DialogTrigger className="h-auto w-full rounded-lg border py-2 hover:bg-zinc-100 hover:shadow-inner">
        <div className="flex h-full w-full items-center justify-between px-4">
          <span className="text-zinc-900">
            {productIngredients
              .map((ingredient) => ingredient.name)
              .join(" | ")}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <span className="text-xl font-bold">Selecione os ingredientes</span>
          </DialogTitle>
          <DialogDescription className="border-b border-t py-6">
            <form className=" grid grid-cols-3 gap-2">
              {allIngredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id={ingredient.id}
                    name={ingredient.name}
                    value={ingredient.name}
                    defaultChecked={productIngredients?.some(
                      (i) => i.id === ingredient.id,
                    )}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        setProductIngredients((prev) => [...prev, ingredient]);
                        setSelected((prev) => [...prev, ingredient]);
                      } else {
                        setProductIngredients((prev) =>
                          prev.filter((i) => i.id !== ingredient.id),
                        );
                        setSelected((prev) =>
                          prev.filter((i) => i.id !== ingredient.id),
                        );
                      }
                    }}
                  />
                  <label htmlFor={ingredient.id}>{ingredient.name}</label>
                </div>
              ))}
            </form>
          </DialogDescription>
          <div className="flex w-full items-center justify-between gap-4">
            <Button className="w-1/2" type="button" variant={"outline"}>
              Adicionar Ingrediente
            </Button>
            <Button className="w-1/2" type="button" variant={"outline"}>
              <DialogClose>Selecionar</DialogClose>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
