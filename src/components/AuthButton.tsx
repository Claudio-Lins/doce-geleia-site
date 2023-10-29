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
          href={page === "/admin/register" ? "/auth/login" : "/auth/register"}
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
        >
          {page === "/admin/register" ? "Entrar" : "Criar contar"}
        </Link>
      )}
    </>
  );
}
