"use client";

import { Product } from "@/@types";
import { useProductStore } from "@/hooks/useProductStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { JamIcon } from "../../../public/assets/icons/jam-icon";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { AdminEditProductModal } from "./AdminEditProductModal";

export function ContentAdminJams() {
  const [jams, setJams] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setShowModalEditProduct, showModalEditProduct } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getJams() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
      );
      const data = await response.json();
      setJams(data);
    }
    getJams();
  }, []);

  async function toggleDestack(id: string) {
    setIsLoading(true);
    const jam = jams.find((j) => j.id === id);
    if (!jam) {
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/destack`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          isDestack: !jam?.isDestack,
        }),
      },
    );
    if (response.ok) {
      setJams(
        jams.map((j) => (j.id === id ? { ...j, isDestack: !j.isDestack } : j)),
      );
    }
    toast.success("Status atualizado com sucesso!");
    router.refresh();
    setIsLoading(false);
  }

  function handleEditProduct(id: string) {
    const selectedJam = jams.find((jam) => jam.id === id);
    setSelectedProduct(selectedJam || null);
    setShowModalEditProduct(true);
  }

  return (
    <div className="flex w-full flex-col justify-center space-y-2 pb-10">
      {jams
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((jam) => (
          <div
            className="flex w-full items-center justify-between rounded-lg border p-2"
            key={jam.id}
          >
            <div className="flex-1 justify-between">
              <span className="text-lg font-bold">{jam.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <Switch
                  disabled={isLoading}
                  id="published"
                  checked={jam.isDestack}
                  onChange={() => toggleDestack(jam.id)}
                  onClick={() => toggleDestack(jam.id)}
                />
                <Label htmlFor="published">
                  {jam.isDestack ? "Publicado" : "Publicar"}
                </Label>
              </div>
              <Button onClick={() => handleEditProduct(jam.id)} className="">
                Editar
              </Button>
            </div>
          </div>
        ))}
      <div className="w-full">
        <Button
          variant={"outline"}
          className="ml-auto mt-6 flex items-center gap-2"
        >
          <span>Criar Geleia</span>
          <JamIcon className="h-4 w-4" />
        </Button>
      </div>
      <AdminEditProductModal product={selectedProduct} />
    </div>
  );
}
