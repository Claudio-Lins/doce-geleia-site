"use client";
import { InfoClient, SelectedProduct } from "@/@types";
import { buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/hooks/useCartStore";
import { cn } from "@/lib/utils";
import { Mail, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import Currency from "../currency";
import { BtnToggleShip } from "../shipping/BtnToggleShip";
import { Button } from "../ui/button";

const EmailOrderSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  totalItems: z.number(),
  shippingPrice: z.number(),
  subTotalPrice: z.number(),
  products: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      weight: z.number(),
      quantity: z.number(),
    })
  ),
});

export type EmailContactProps = z.infer<typeof EmailOrderSchema>;

export function FooterCheckout() {
  const router = useRouter();
  const [client, setClient] = useState({} as InfoClient);
  const [itemsSelected, setItemsSelected] = useState([] as SelectedProduct[]);
  const [isPortugal, setIsPortugal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const {
    showModalOrder,
    setShowModalOrder,
    infoClient,
    items,
    totalItems,
    totalWeight,
    subTotalPrice,
    shippingPrice,
    removeItem,
    addItem,
    isPickup,
    resetLocalStorage,
  } = useCartStore();

  useEffect(() => {
    setItemsSelected(items);
  }, [items]);

  useEffect(() => {
    setClient(infoClient);
  }, [infoClient]);

  useEffect(() => {
    setFirstName(client.firstName);
    setLastName(client.lastName);
    setEmail(client.email);
    itemsSelected.map((item) => {
      const products = {
        id: item.id,
        title: item.title,
        weight: item.weight,
        quantity: item.quantity,
      };
      return products;
    });
  }, [client, itemsSelected]);

  async function sendEmail(data: EmailContactProps) {
    const response = await fetch("/api/email-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Pedido enviado com sucesso!");
      resetLocalStorage();
      router.push("/");
    } else {
      toast.error("Erro ao enviar o pedido");
    }
  }

  useEffect(() => {
    if (infoClient && infoClient?.phone.slice(0, 3) === "351") {
      setIsPortugal(true);
    } else {
      setIsPortugal(false);
    }
  }, [infoClient]);

  return (
    <div className="py-4 border-t-4">
      <div className="flex w-full items-center gap-4 divide-x-2 justify-end">
        {isPortugal ? (
          <div className="flex w-full justify-end items-center gap-2">
            <div className="w-1/2">
              <BtnToggleShip />
            </div>
            <strong className="">
              <Currency value={isPickup ? 0 : shippingPrice} />
            </strong>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Frete:</span>
            <strong className="">Consultar</strong>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-gray-500 ml-4">Subtotal</span>
          <strong className="text-2xl">
            <Currency value={subTotalPrice / 100} />
          </strong>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-950 font-bold text-lg ml-4">Total</span>
          <strong className="text-2xl">
            <Currency
              value={
                isPickup
                  ? subTotalPrice / 100
                  : subTotalPrice / 100 + shippingPrice
              }
            />
          </strong>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center flex-col sm:flex-row w-full gap-2">
          {isPickup ? (
            <div className="mt-4 rounded-lg border-[1px] p-2 text-xs text-gray-500 md:w-1/2 h-40">
              <h3 className="mb-2 border-b font-bold text-lg text-gray-500">
                Dados de Recolha
              </h3>
              <strong>Doce Geleia</strong>
              <br />
              <span>
                <b>Email:</b> docegeleia@gmail.com -{" "}
              </span>
              <span>
                <b>Telemóvel:</b> +351 910 344 904
              </span>
              <p>
                <b>Morada:</b> Estrada de Mem Martins, 168A
              </p>
              <span>Mem Martins - Sintra</span>
              <span>2725-381</span>
              <hr className="my-1" />
              <small>
                <strong>Nota:</strong> Próximo ao Cruzeiro
              </small>
            </div>
          ) : (
            <div className="mt-4 rounded-lg border-[1px] p-2 text-xs text-gray-500 md:w-1/2 h-40">
              <h3 className="mb-2 border-b font-bold text-lg text-gray-500">
                Dados de Entrega
              </h3>
              <strong>{client.firstName}</strong>
              <strong> {client.lastName}</strong>
              <br />
              <span>{client.email} - </span>
              <span>Telemóvel: +{client.phone}</span>
              <p>{client.address}</p>
              <span>{client.city} - </span>
              <span>{client.postalCode}</span>
              <hr className="my-1" />
              <small>Nota</small>
              <p>{client.observations}</p>
            </div>
          )}

          <div className="mt-4 rounded-lg border-[1px] p-2 text-xs text-gray-500 md:w-1/2 h-40">
            <h3 className="mb-2 border-b font-bold text-lg text-gray-500">
              Dados de Pagamento
            </h3>
            <div className="w-full rounded-lg p-2 flex flex-col justify-center items-center">
              <div className="flex items-center gap-2">
                <Image
                  src={"/assets/mbway_logo.svg"}
                  alt="MBWay"
                  width={60}
                  height={30}
                />
                <strong className="text-lg text-zinc-900">910 344 904</strong>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={"/assets/activoBank.png"}
                  alt="MBWay"
                  width={100}
                  height={40}
                />
                <strong className=" text-zinc-900 print:text-xs">
                  IBAN PT50 0002 0123 1234 5678 9015 4
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-10 w-full print:hidden">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-1/2 flex items-center gap-2 text-zinc-50 bg-red-500"
          )}
        >
          <span>Cancelar</span>
        </Link>

        <Button
          onClick={() => window.print()}
          className="w-1/2 bg-gradient-to-tr from-zinc-500 to-zinc-700 flex items-center gap-2 text-white"
          type="submit"
        >
          <span>Imprimir</span>
          <Printer size={16} />
        </Button>

        <Button
          onClick={() =>
            sendEmail({
              firstName,
              lastName,
              email,
              totalItems,
              shippingPrice,
              subTotalPrice,
              products: itemsSelected,
            })
          }
          className="w-1/2 bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center gap-2 text-white"
          type="button"
        >
          <span>Enviar</span>
          <Mail size={16} />
        </Button>
      </div>
    </div>
  );
}
