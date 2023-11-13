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
  ingredients: Ingredient[];
  ingredientes: Ingredient[];
  onSave: (selected: Ingredient[]) => void;
}

export function AdminIngredientsModal({
  ingredients,
  onSave,
}: AdminIngredientsModalProps) {
  const [selected, setSelected] = useState<Ingredient[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ingredients`)
      .then((res) => res.json())
      .then((data) => {
        setAllIngredients(data);
      });
  }, [ingredients]);

  return (
    <Dialog>
      <DialogTrigger className="h-auto w-full rounded-lg border py-2 hover:bg-zinc-100 hover:shadow-inner">
        {selected.length > 0 ? (
          <div className="flex h-full w-full items-center justify-between px-4">
            <span className="text-zinc-900">
              {selected.map((ingredient) => ingredient.name).join(" | ")}
            </span>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-between px-4">
            <span className="text-zinc-900">
              {ingredients?.map((ingredient) => ingredient.name).join(" | ")}
            </span>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Escolha os ingredientes</DialogTitle>
          <DialogDescription className="border-b border-t py-4">
            <form className=" grid grid-cols-3 gap-2">
              {allIngredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id={ingredient.id}
                    name={ingredient.name}
                    value={ingredient.name}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelected([...selected, ingredient]);
                      } else {
                        setSelected(
                          selected.filter((i) => i.id !== ingredient.id),
                        );
                      }
                    }}
                  />
                  <label htmlFor={ingredient.id}>{ingredient.name}</label>
                </div>
              ))}
            </form>
          </DialogDescription>
          <div className="flex w-full items-center justify-between gap-4 pt-6">
            <Button
              type="button"
              variant={"outline"}
              className="w-full text-zinc-400"
            >
              Adicionar Ingrediente
            </Button>
            <DialogClose>
              <Button
                type="button"
                onClick={() => {
                  onSave(selected);
                }}
                variant={"outline"}
                className="w-full text-zinc-400"
              >
                Salvar
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
