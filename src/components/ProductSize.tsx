import { cn } from "@/lib/utils"
import { MinusCircle, PlusCircle } from "lucide-react"
import Currency from "./currency"

interface ProductSizeProps {
  weight: number
  price: number
  quantity: number
  setQuantity: (quantity: number) => void
}

export function ProductSize({
  weight,
  price,
  quantity,
  setQuantity,
}: ProductSizeProps) {
  return (
    <div className="w-12">
      <div className="flex flex-col justify-start">
        <p className="text-xs text-left">{weight}</p>
        <span className="font-bold text-left text-zinc-950">
          <Currency value={price / 100} />
        </span>
      </div>
      <div className="flex mt-2 items-center justify-evenly gap-2">
        <button
          disabled={quantity <= 0}
          onClick={() => {
            setQuantity(quantity - 1)
          }}
          className={cn(
            "opacity-10 cursor-not-allowed text-sm",
            quantity >= 1 && "opacity-100 cursor-pointer"
          )}
        >
          <MinusCircle className="w-5 h-5" />
        </button>
        <span className="w-5 text-center">{quantity || 0}</span>
        <button onClick={() => setQuantity(quantity + 1)} className="">
          <PlusCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
