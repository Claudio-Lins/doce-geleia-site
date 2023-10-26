"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
export function AuthButton({ page }: { page: string }) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  return (
    <>
      {!isAuthenticated && (
        <Link
          href={page === "/auth/register" ? "/auth/login" : "/auth/register"}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-4 top-4 z-20 cursor-pointer md:right-8 md:top-8",
          )}
        >
          {page === "/admin/register" ? "Entrar" : "Criar contar"}
        </Link>
      )}
    </>
  );
}
