import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./button"
import { MinusCircle, PlusCircle } from "lucide-react"
import Currency from "../currency"
import { MouseEventHandler, useState } from "react"
import Image from "next/image"
import { Separator } from "./separator"
import { useCartStore } from "@/context/cartContext"

interface AddCardProps {
  weight: string
  price: number
  imageUrl: string
  quantity: number
  productDetailId: string
  onClickAdd?: MouseEventHandler<HTMLButtonElement> | undefined
  onClickRemove?: MouseEventHandler<HTMLButtonElement> | undefined
  handleIncreaseQt: () => void
  handleDecreaseQt: () => void
}

export function AddCard({
  price,
  weight,
  imageUrl,
  onClickAdd,
  onClickRemove,
  handleIncreaseQt,
  handleDecreaseQt,
  quantity,
}: AddCardProps) {
  const cart = useCartStore()
  return (
    <div className="p-0 overflow-hidden rounded-lg ">
      <header className=" p-4">
        <div className="flex flex-col">
          <span className="text-xs font-light">{weight}</span>
          <span className="text-xl font-bold">
            <Currency value={price / 100} />
          </span>
        </div>
      </header>
      <div className="flex px-4 items-center justify-evenly gap-2">
        <button onClick={handleDecreaseQt} className="">
          <MinusCircle />
        </button>
        <span className="">{quantity}</span>
        <button onClick={handleIncreaseQt} className="">
          <PlusCircle />
        </button>
      </div>
    </div>
  )
}
