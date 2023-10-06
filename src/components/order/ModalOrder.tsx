"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { useCartStore } from "@/hooks/useCartStore"
import { Separator } from "../ui/separator"
import { Mail, Printer } from "lucide-react"
import { SelectedProduct } from "@/@types"
import Currency from "../currency"
import { ScrollArea } from "../ui/scroll-area"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function ModalOrder() {
  const [print, setPrint] = useState(false)

  const {
    showModalOrder,
    setShowModalOrder,
    infoClient,
    items,
    totalItems,
    totalWeight,
    subTotalPrice,
  } = useCartStore()

  async function handlePrint() {
    await setPrint(true)
    await window.print()
    await setPrint(false)
  }
  return (
    <Dialog open={showModalOrder}>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>
            Resumo da compra de {infoClient.firstName} {infoClient.lastName}
          </DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        <ScrollArea className={cn(!print && "max-h-[350px]")}>
          <div className="mt-4 w-full rounded-lg border p-4">
            <h2 className="text-2xl font-bold">Resumo</h2>
            <table className="mt-4 w-full text-sm text-gray-500">
              <thead className="border-b">
                <tr className="text-gray-500">
                  <th className="text-left">Produto</th>
                  <th className="text-center">Quantidade</th>
                  <th className="text-right">Sub-total</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((item: SelectedProduct) => {
                  return (
                    <tr key={item.id} className="border-b">
                      <td className="text-left">
                        <div className="flex items-center gap-2 py-2">
                          <Image
                            // @ts-ignore
                            src={item.coverUrl ?? ""}
                            alt={item.title}
                            width={30}
                            height={30}
                            className="rounded-md object-fill
                                "
                          />
                          <span>
                            {item.title} {item.size}
                          </span>
                        </div>
                      </td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">
                        <Currency value={(item.price * item.quantity) / 100} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between">
              <span className="text-gray-500">Frete</span>
              <strong className="">frete</strong>
            </div>
            <div className="mt-4 flex justify-between">
              <span className="text-gray-500">Total</span>
              <strong className="text-2xl">
                <Currency value={subTotalPrice / 100} />
              </strong>
            </div>
          </div>
        </ScrollArea>
        <Separator className="my-2" />
        <div className="flex flex-col">
          <div className="flex items-center flex-col sm:flex-row w-full gap-2">
            <div className="mt-4 rounded-lg border-[1px] p-2 text-xs text-gray-500 md:w-1/2 h-40">
              <h3 className="mb-2 border-b font-bold text-lg text-gray-500">
                Dados de entrega
              </h3>
              <strong>{infoClient.firstName}</strong>
              <strong> {infoClient.lastName}</strong>
              <br />
              <span>{infoClient.email} - </span>
              <span>{infoClient.phone}</span>
              <p>{infoClient.address}</p>
              <span>{infoClient.city} - </span>
              <span>{infoClient.postalCode}</span>
              <hr className="my-1" />
              <small>Nota</small>
              <p>{infoClient.observations}</p>
            </div>

            <div className="mt-4 rounded-lg border-[1px] p-2 text-xs text-gray-500 md:w-1/2 h-40">
              <h3 className="mb-2 border-b font-bold text-lg text-gray-500">
                Dados de pagamento
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
                    width={120}
                    height={40}
                  />
                  <strong className=" text-zinc-900">
                    IBAN PT50 0002 0123 1234 5678 9015 4
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="print:hidden">
          <Button
            onClick={() => setShowModalOrder(false)}
            variant={"destructive"}
            className="w-1/2 "
            type="submit"
          >
            <span>Cancelar</span>
          </Button>

          <Button
            onClick={handlePrint}
            className="w-1/2 bg-gradient-to-tr from-zinc-500 to-zinc-700 flex items-center gap-2 text-white"
            type="submit"
          >
            <span>Imprimir</span>
            <Printer size={16} />
          </Button>

          <Button
            onClick={() => setShowModalOrder(false)}
            className="w-1/2 bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center gap-2 text-white"
            type="submit"
          >
            <span>Enviar</span>
            <Mail size={16} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
