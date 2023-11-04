"use client";

import { Product } from "@/@types";
import { useEffect, useState } from "react";
import { JamIcon } from "../../../public/assets/icons/jam-icon";
import { Button } from "../ui/button";

interface ContentAdminJamsProps {
  jams: Product[];
}

export function ContentAdminJams() {
  const [jams, setJams] = useState<Product[]>([]);
  useEffect(() => {
    async function getJams() {
      const response = await fetch("/api/products/jams");
      const data = await response.json();
      setJams(data);
    }
    getJams();
  }, []);

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
              <button className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600">
                Editar
              </button>
              <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600">
                Eliminar
              </button>
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
    </div>
  );
}
