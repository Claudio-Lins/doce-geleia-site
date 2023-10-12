interface SplashDiscountProps {
  discount: number
}

export function SplashDiscount({ discount }: SplashDiscountProps) {
  return (
    <div className="absolute w-12 h-12 flex items-center justify-center bg-[url('/assets/Star.svg')] bg-no-repeat -right-2 -top-2">
      <p className="text-white font-bold text-sm">-{discount}%</p>
    </div>
  )
}
