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
import { CartItems } from "../CartItems"
import { useCartStore } from "@/context/cartContext"
import { ShoppingBag } from "lucide-react"
import ModalContexts from "../modals/use-modal-store"
import { Button } from "./button"

interface NavbarProps {
  // products: ProductTypes[]
}

export function Navbar() {
  const pathName = usePathname()
  const cart = useCartStore()
  const { setShowModalProducts, showModalProducts } = ModalContexts()
  return (
    <div
      className={cn(
        " fixed inset-0 z-10 w-full h-24 bg-transparent px-4",
        pathName !== "/" ? "bg-white" : "bg-transparent"
      )}
    >
      <div className="w-full max-w-6xl mx-auto py-4 flex items-center justify-between">
        <div className="border p-1">
          <Link href="/" legacyBehavior passHref>
            <Image
              src={
                pathName === "/" ? "/logo/lg-site-neg.svg" : "/logo/lg-site.svg"
              }
              alt="Doce Geleia"
              width={60}
              height={60}
              className="cursor-pointer aspect-square"
            />
          </Link>
        </div>
        <NavigationMenu>
          <NavigationMenuItem className="gap-2 flex items-center">
            <Link href="/products" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  "bg-transparent px-3 py-2 rounded-lg",
                  pathName !== "/"
                    ? " text-zinc-950 hover:bg-zinc-100  bg-white"
                    : " text-white hover:bg-zinc-100/50 hover:text-zinc-900"
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
                    : " text-white hover:bg-zinc-100/50 hover:text-zinc-900"
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
                    : " text-white hover:bg-zinc-100/50 hover:text-zinc-900"
                )}
              >
                Contacto
              </NavigationMenuLink>
            </Link>

            <NavigationMenuLink
              className={cn(
                "bg-transparent px-3 py-2 rounded-lg",
                pathName !== "/"
                  ? " text-zinc-950 hover:bg-zinc-100"
                  : " text-white hover:bg-zinc-100/50 hover:text-zinc-900"
              )}
            >
              <ShoppingBag
                onClick={() => setShowModalProducts(true)}
                className=""
              />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </div>
  )
}
