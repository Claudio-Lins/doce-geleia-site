"use client";
import { InfoClient, SelectedProduct } from "@/@types";
import { buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/hooks/useCartStore";
import { cn } from "@/lib/utils";
import { useCreateOrder } from "@/utils/useCreateOrder";
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
import { Table, TableCell, TableRow } from "../ui/table";
import { DataPickupShip } from "./DataPickupShip";

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
      netWeight: z.number(),
      quantity: z.number(),
    })
  ),
});

export type EmailContactProps = z.infer<typeof EmailOrderSchema>;

export function FooterCheckout() {
  const { handleFormOrder } = useCreateOrder();
  const [sending, setSending] = useState(false);
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
        netWeight: item.netWeight,
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
      resetLocalStorage();
      toast.success("Pedido enviado com sucesso!");
      router.push("/");
    } else {
      toast.error("Erro ao enviar o pedido");
    }
  }

  async function handleSend() {
    setSending(true);
    await handleFormOrder();
    sendEmail({
      firstName,
      lastName,
      email,
      totalItems,
      shippingPrice,
      subTotalPrice,
      products: itemsSelected,
    });
    setSending(false);
  }

  useEffect(() => {
    if (infoClient && infoClient?.country === "Portugal") {
      setIsPortugal(true);
    } else {
      setIsPortugal(false);
    }
  }, [infoClient]);

  return (
    <div className="py-4 border-t-4">
      <Table className="w-full text-sm text-zinc-950">
        <TableRow>
          <TableCell className="text-right font-bold"></TableCell>
          <TableCell className="text-right font-bold">Subtotal</TableCell>
          <TableCell className="text-right text-lg w-56">
            <Currency value={subTotalPrice / 100} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-right font-bold">Frete</TableCell>
          <TableCell className="text-right text-lg w-72">
            <BtnToggleShip />
          </TableCell>
          <TableCell className="text-right text-lg w-56">
            <Currency value={isPickup ? 0 : shippingPrice} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-right"></TableCell>
          <TableCell className="text-right text-lg font-bold">Total</TableCell>
          <TableCell className="text-right font-extrabold text-xl w-56">
            <Currency
              value={
                isPickup
                  ? subTotalPrice / 100
                  : subTotalPrice / 100 + shippingPrice
              }
            />
          </TableCell>
        </TableRow>
      </Table>
      <div className="flex flex-col w-full">
        <div className="flex items-center flex-col sm:flex-row w-full gap-2 px-2">
          <DataPickupShip />

          <div className="mt-4 rounded-lg border-[1px] p-2 text-x w-full text-gray-500 print:w-1/2 md:w-1/2 h-48">
            <h3 className=" border-b font-bold text-lg text-gray-500">
              Dados de Pagamento
            </h3>
            <div className="flex items-center justify-center pt-2">
              <div className="w-full rounded-lg flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col items-center">
                  <Image
                    src={"/assets/mbway_logo.svg"}
                    alt="MBWay"
                    width={60}
                    height={30}
                  />
                  <strong className="text-lg text-zinc-900">966 835 913</strong>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src={"/assets/activoBank.jpg"}
                    alt="MBWay"
                    width={90}
                    height={40}
                  />
                  <strong className=" text-zinc-900 print:text-[10px]">
                    IBAN PT50 0023 0000 4555 8724 6799 4
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 px-2 mt-10 w-full print:hidden">
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
          type="button"
        >
          <span>Imprimir</span>
          <Printer size={16} />
        </Button>

        <Button
          onClick={handleSend}
          disabled={sending}
          className="w-1/2 bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center gap-2 text-white"
        >
          <span>Enviar</span>
          <Mail size={16} />
        </Button>
      </div>
    </div>
  );
}
