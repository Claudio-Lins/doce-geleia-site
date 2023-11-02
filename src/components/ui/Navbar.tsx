"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Profile } from "../Profile";
import { Cart } from "../order/Cart";
import { Button } from "./button";

export function Navbar() {
  const pathName = usePathname();
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");
  const [cartColor, setCartColor] = useState("white");
  const [lgNeg, setLgNeg] = useState(false);

  const router = useRouter();
  const { data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 10) {
        setColor("#ffffff");
        setTextColor("#09090b");
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

  return (
    <div
      className={cn(
        " fixed inset-0 z-10 h-28 w-full bg-transparent px-4 print:hidden",
        pathName !== "/" ? "bg-white" : "bg-transparent",
      )}
      style={{
        backgroundColor: color,
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between py-4">
        <div className="">
          <Link href="/" legacyBehavior passHref>
            <Image
              src={
                pathName === "/" && !lgNeg
                  ? "/logo/logo-pos.svg"
                  : "/logo/logo-pos.svg"
              }
              alt="Doce Geleia"
              width={80}
              height={80}
              className="aspect-square cursor-pointer"
            />
          </Link>
        </div>
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
            <Cart />
            {data ? (
              <Profile />
            ) : (
              <Button
                onClick={handleLogin}
                variant={"ghost"}
                size={"icon"}
                className={cn(
                  "rounded-lg bg-transparent",
                  pathName !== "/"
                    ? " text-zinc-950 hover:bg-zinc-100"
                    : " hover:bg-zinc-100/50 hover:text-zinc-900",
                )}
              >
                <User strokeWidth={1.5} size={24} />
              </Button>
            )}
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </div>
  );
}
