import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function MinhaConta() {
  const session = await getSession();

  if (session?.role !== "USER") {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
        <p>Área no permitida!</p>;
        {session?.role && <p>Your role is {session?.role}</p>}
        <Link
          href="/auth/login"
          className={buttonVariants({ variant: "outline" })}
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <p>Painel do Usuário</p>;
    </div>
  );
}
