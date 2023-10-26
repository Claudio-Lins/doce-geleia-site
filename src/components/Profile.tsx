"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

export function Profile() {
  const { data } = useSession();
  return (
    <div className="flex flex-col items-center justify-center">
      <HoverCard>
        <HoverCardTrigger>
          <div className="flex flex-col items-center justify-center gap-2">
            <Avatar>
              <AvatarImage
                src={data?.user?.image ?? "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex flex-col gap-2 rounded-lg border p-2">
            <small className="text-center text-zinc-900">
              {data?.user?.name}
            </small>
            {data?.user.role === "ADMIN" ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/admin"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Dashboard Admin
                </Link>
                <Link
                  href="/admin/orders"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Pedidos
                </Link>
              </div>
            ) : (
              <Link
                href="/profile"
                className={buttonVariants({ variant: "outline" })}
              >
                Conta Usuário
              </Link>
            )}

            <Button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              variant="destructive"
              className="text-left"
            >
              Sair
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
