"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, User } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Profile } from "../Profile";
import { Cart } from "../order/Cart";

export function Navbar() {
  const pathName = usePathname();
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");
  const [cartColor, setCartColor] = useState("white");
  const [lgNeg, setLgNeg] = useState(false);
  const [scrollDetect, setScrollDetect] = useState(false);

  const router = useRouter();
  const { data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 10) {
        setColor("#fff");
        setTextColor("#0b0b0d");
        setCartColor("#09090b");
        setLgNeg(true);
      } else {
        setColor("transparent");
        setTextColor("white");
        setLgNeg(false);
      }
    };
    pathName === "/order" ? setColor("#ffffff") : setColor("transparent");
    window.addEventListener("scroll", changeColor);
  }, [pathName]);

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 10) {
        setScrollDetect(true);
      } else {
        setScrollDetect(false);
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      className={cn(
        " fixed inset-0 z-10 h-24 w-full bg-transparent px-4 print:hidden",
        pathName !== "/" ? "bg-white" : "bg-transparent",
      )}
      style={{
        backgroundColor: color,
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between py-4">
        <div className="w-12 md:w-20">
          <Link href="/" legacyBehavior passHref>
            <Image
              src={"/logo/logo-pos.svg"}
              alt="Doce Geleia"
              width={60}
              height={60}
              className="aspect-square cursor-pointer"
            />
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <NavigationMenu>
            <NavigationMenuItem
              className="flex items-center gap-2"
              style={{
                color: textColor,
              }}
            >
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "rounded-lg bg-transparent px-3 py-2",
                    pathName !== "/"
                      ? " bg-white text-zinc-950  hover:bg-zinc-100"
                      : " hover:bg-zinc-100/50 hover:text-zinc-900",
                  )}
                >
                  Produtos
                </NavigationMenuLink>
              </Link>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "rounded-lg bg-transparent px-3 py-2",
                    pathName !== "/"
                      ? " text-zinc-950 hover:bg-zinc-100"
                      : " hover:bg-zinc-100/50 hover:text-zinc-900",
                  )}
                >
                  Sobre
                </NavigationMenuLink>
              </Link>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "rounded-lg bg-transparent px-3 py-2",
                    pathName !== "/"
                      ? " text-zinc-950 hover:bg-zinc-100"
                      : " hover:bg-zinc-100/50 hover:text-zinc-900",
                  )}
                >
                  Contacto
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <Cart />
          {data ? (
            <Profile />
          ) : (
            <div
              onClick={handleLogin}
              className={cn(
                "cursor-pointer p-1 text-zinc-50  transition-all duration-200 ease-in-out hover:scale-110 hover:rounded-lg hover:border",
                pathName === "/" ? " text-zinc-50" : " text-zinc-950",
                scrollDetect && "text-zinc-900",
              )}
            >
              <User strokeWidth={1.5} size={24} />
            </div>
          )}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu
                  strokeWidth={1.5}
                  size={24}
                  className={cn(
                    pathName === "/" ? " text-zinc-50" : " text-zinc-950",
                    scrollDetect && "text-zinc-900",
                  )}
                />
              </SheetTrigger>
              <SheetContent className="flex w-full max-w-none flex-col items-center justify-center bg-white text-xl">
                <NavigationMenu>
                  <NavigationMenuItem className="flex flex-col items-center gap-2">
                    <Link href="/products" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          "rounded-lg bg-transparent px-3 py-2",
                          pathName === "/"
                            ? " bg-white text-zinc-950  hover:bg-zinc-100"
                            : " hover:bg-zinc-100/50 hover:text-zinc-900",
                        )}
                      >
                        <SheetClose>Produtos</SheetClose>
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          "rounded-lg bg-transparent px-3 py-2",
                          pathName === "/"
                            ? " text-zinc-950 hover:bg-zinc-100"
                            : " hover:bg-zinc-100/50 hover:text-zinc-900",
                        )}
                      >
                        <SheetClose>Sobre</SheetClose>
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/contact" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          "rounded-lg bg-transparent px-3 py-2",
                          pathName === "/"
                            ? " text-zinc-950 hover:bg-zinc-100"
                            : " hover:bg-zinc-100/50 hover:text-zinc-900",
                        )}
                      >
                        <SheetClose>Contacto</SheetClose>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenu>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
