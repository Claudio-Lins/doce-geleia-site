"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { GoogleGIcon } from "../../public/assets/icons/google-g-icon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastAction } from "./ui/toast";

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface IUserProps {
  email: string;
  password: string;
}

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session]);

  const [data, setData] = useState<IUserProps>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    console.log(data);

    const res = await signIn<"credentials">("credentials", {
      redirect: false,
      ...data,
    });

    if (res?.error) {
      toast({
        title: "Erro ao logar",
        description: res.error,
        variant: "destructive",
        action: (
          <ToastAction altText="Tente novamente">Tente novamente</ToastAction>
        ),
      });
    } else {
      router.push("/");
    }

    setData({
      email: "",
      password: "",
    });
    setIsLoading(false);
  }

  function handleChance(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <div
      className={cn("mx-auto grid w-full max-w-xs gap-6", className)}
      {...props}
    >
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="Email"
              type="email"
              placeholder="Email"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              value={data.email}
              onChange={handleChance}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              name="password"
              value={data.password}
              onChange={handleChance}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Entrar
          </Button>
        </div>
      </form>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <span>ou</span>
        <Button
          className="flex w-full items-center gap-2"
          type="button"
          onClick={() => signIn("google")}
          variant="secondary"
        >
          <GoogleGIcon className="w-6" />
          Entrar com Google
        </Button>
      </div>
    </div>
  );
}
