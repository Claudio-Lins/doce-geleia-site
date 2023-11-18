import { Metadata } from "next";
import Link from "next/link";

import { AuthButton } from "@/components/AuthButton";
import { Button } from "@/components/ui/button";
import { UserLoginForm } from "@/components/user-login-auth";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className=" flex min-h-screen w-full flex-col items-center justify-center bg-[url('/img01.jpg')] bg-cover bg-right bg-no-repeat">

        <div className="bg-white/50 rounded-lg backdrop-blur-sm flex w-full max-w-sm items-center justify-center px-4 py-24 pb-10 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center gap-4 sm:w-[350px]">
            <div className="flex flex-col text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
              <p className="text-sm text-muted-foreground">
                Entre com seu email e senha!
              </p>
            </div>
            <UserLoginForm />
            <div className="flex w-full flex-col items-center justify-center">
              {/* <span>ou</span> */}
              <AuthButton page="register" />
            </div>
            <Link
              href="/policy"
              className="w-full text-center text-xs underline-offset-4 hover:text-primary hover:underline"
            >
              Politica de privacidade
            </Link>
          </div>
        </div>
        <Link href="/" className="absolute top-4 right-4">
            <Button variant="outline">Voltar</Button>
        </Link>
      </div>
    </>
  );
}
