"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import ModalContexts from "../modals/use-modal-store"
import { useEffect, useState } from "react"
import { Cart } from "../order/Cart"
import { useOrderStore } from "@/context/orderStore"
import { useCartStore } from "@/hooks/useCartStore"

export function Navbar() {
  const { showCart, setShowCart } = useCartStore()
  const pathName = usePathname()
  const [color, setColor] = useState("transparent")
  const [textColor, setTextColor] = useState("white")
  const [cartColor, setCartColor] = useState("white")
  const [lgNeg, setLgNeg] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 10) {
        setColor("#ffffff")
        setTextColor("#09090b")
        setCartColor("#09090b")
        setLgNeg(true)
      } else {
        setColor("transparent")
        setTextColor("white")
        setLgNeg(false)
      }
    }
    pathName === "/order" ? setColor("#ffffff") : setColor("transparent")
    window.addEventListener("scroll", changeColor)
  }, [pathName])

  return (
    <div
      className={cn(
        " fixed inset-0 z-10 w-full h-24 bg-transparent px-4",
        pathName !== "/" ? "bg-white" : "bg-transparent",
        pathName === "/order/checkout" ? "hidden" : "block"
      )}
      style={{
        backgroundColor: color,
      }}
    >
      <div className="w-full max-w-6xl mx-auto py-4 flex items-center justify-between">
        <div className="border p-1">
          <Link href="/" legacyBehavior passHref>
            <Image
              src={
                pathName === "/" && !lgNeg
                  ? "/logo/lg-site-neg.svg"
                  : "/logo/lg-site.svg"
              }
              alt="Doce Geleia"
              width={60}
              height={60}
              className="cursor-pointer aspect-square"
            />
          </Link>
        </div>
        <NavigationMenu>
          <NavigationMenuItem
            className="gap-2 flex items-center"
            style={{
              color: textColor,
            }}
          >
            <Link href="/products" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  "bg-transparent px-3 py-2 rounded-lg",
                  pathName !== "/"
                    ? " text-zinc-950 hover:bg-zinc-100  bg-white"
                    : " hover:bg-zinc-100/50 hover:text-zinc-900"
                )}
              >
                Produtos
              </NavigationMenuLink>
            </Link>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  "bg-transparent px-3 py-2 rounded-lg",
                  pathName !== "/"
                    ? " text-zinc-950 hover:bg-zinc-100"
                    : " hover:bg-zinc-100/50 hover:text-zinc-900"
                )}
              >
                Sobre
              </NavigationMenuLink>
            </Link>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  "bg-transparent px-3 py-2 rounded-lg",
                  pathName !== "/"
                    ? " text-zinc-950 hover:bg-zinc-100"
                    : " hover:bg-zinc-100/50 hover:text-zinc-900"
                )}
              >
                Contacto
              </NavigationMenuLink>
            </Link>
            <Cart />
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </div>
  )
}
