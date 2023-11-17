"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";

export function Profile() {
  const { data } = useSession();
  const [isOpened, setIsOpened] = useState(false);

  function toglePopover() {
    setIsOpened(!isOpened);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Popover open={isOpened} onOpenChange={toglePopover}>
        <PopoverTrigger onClick={toglePopover}>
          <div className="flex flex-col items-center justify-center gap-2">
            <Avatar>
              <AvatarImage
                src={data?.user?.image ?? "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2 rounded-lg border p-2">
            <small className="text-center text-zinc-900">
              {data?.user?.name}
            </small>
            {data?.user.role === "ADMIN" ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/admin"
                  onClick={toglePopover}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Dashboard Admin
                </Link>
              </div>
            ) : (
              <Link
                href="/profile"
                onClick={toglePopover}
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
        </PopoverContent>
      </Popover>
    </div>
  );
}
