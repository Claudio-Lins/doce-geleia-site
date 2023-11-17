import { Metadata } from "next";
import Link from "next/link";

import { AuthButton } from "@/components/AuthButton";
import { Slider } from "@/components/Hero/Slider/Slider";
import { UserLoginForm } from "@/components/user-login-auth";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className=" flex w-full items-center justify-evenly">
        <div className="hidden min-h-screen flex-col items-center justify-center text-white dark:border-r lg:flex">
          <Slider numSlides={1} />
        </div>
        <div className=" flex w-full max-w-sm items-center justify-center px-4 py-24 pb-10 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
              <p className="text-sm text-muted-foreground">
                Entre com seu email e senha!
              </p>
            </div>
            <UserLoginForm />
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <span>ou</span>
              <AuthButton page="register" />
            </div>
            <Link
              href="/policy"
              className="w-full text-center text-xs underline-offset-4 hover:text-primary hover:underline"
            >
              Politica de privacidade
            </Link>
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              Clicando em continuar você esta de acordo com os termos{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos dos serviços
              </Link>{" "}
              and{" "}
              <Link
                href="/police"
                className="underline underline-offset-4 hover:text-primary"
              >
                Politica de privacidade
              </Link>
              .
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
