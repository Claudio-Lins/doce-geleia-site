import { useCartStore } from "@/hooks/useCartStore";
import { useEffect } from "react";

interface WeightLimit {
  max: number;
  price: number;
}

const weightLimits: WeightLimit[] = [
  { max: 1000, price: 6.33 },
  { max: 2000, price: 6.7 },
  { max: 3000, price: 7.07 },
  { max: 4000, price: 7.4 },
  { max: 5000, price: 7.66 },
  { max: 6000, price: 10.0 },
  { max: 7000, price: 10.0 },
  { max: 8000, price: 10.0 },
  { max: 9000, price: 10.0 },
  { max: 10000, price: 10.0 },
  { max: 11000, price: 12.16 },
  { max: 12000, price: 12.16 },
  { max: 13000, price: 12.16 },
  { max: 14000, price: 12.16 },
  { max: 15000, price: 12.16 },
  { max: 16000, price: 12.59 },
  { max: 17000, price: 13.03 },
  { max: 18000, price: 13.45 },
  { max: 19000, price: 13.88 },
  { max: 20000, price: 14.3 },
  { max: 25000, price: 16.44 },
  { max: 30000, price: 18.58 },
];

export function useShippingPriceCalculator(totalWeight: number) {
  const { setShippingPrice } = useCartStore();

  useEffect(() => {
    for (const limit of weightLimits) {
      if (totalWeight <= limit.max) {
        setShippingPrice(limit.price);
        return;
      }
    }
    setShippingPrice(6.33); // default
  }, [setShippingPrice, totalWeight]);
}
