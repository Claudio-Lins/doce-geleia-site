import { useEffect } from "react"
import { useCartStore } from "@/hooks/useCartStore"

interface WeightLimit {
  max: number
  price: number
}

const weightLimits: WeightLimit[] = [
  { max: 150, price: 6.33 },
  { max: 300, price: 6.7 },
  { max: 500, price: 7.07 },
  { max: 1000, price: 7.66 },
  { max: 2000, price: 10 },
]

export function useShippingPriceCalculator(totalWeight: number) {
  const { setShippingPrice } = useCartStore()

  useEffect(() => {
    for (const limit of weightLimits) {
      if (totalWeight <= limit.max) {
        setShippingPrice(limit.price)
        return
      }
    }
    setShippingPrice(12.16) // Default price for weights over 2000
  }, [setShippingPrice, totalWeight])
}

// import { useEffect } from "react"
// import { useCartStore } from "@/hooks/useCartStore"

// export function useShippingPriceCalculator(totalWeight: number) {
//   const { setShippingPrice } = useCartStore()

//   useEffect(() => {
//     if (totalWeight < 150) {
//       setShippingPrice(6.33)
//     } else if (totalWeight > 151 && totalWeight < 300) {
//       setShippingPrice(6.7)
//     } else if (totalWeight > 301 && totalWeight < 500) {
//       setShippingPrice(7.07)
//     } else if (totalWeight > 501 && totalWeight < 1000) {
//       setShippingPrice(7.66)
//     } else if (totalWeight > 1001 && totalWeight < 2000) {
//       setShippingPrice(10)
//     } else {
//       setShippingPrice(12.16)
//     }
//   }, [setShippingPrice, totalWeight])
// }
