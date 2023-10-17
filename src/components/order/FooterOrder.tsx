"use client";
import { buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/hooks/useCartStore";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function FooterOrder() {
  const {
    formSubmitted,
    step,
    setStep,
    setShowModalOrder,
    items,
    setInfoClient,
    infoClient,
  } = useCartStore();

  return (
    <footer className="w-full mt-4">
      {step === 1 && (
        <div className="w-full flex items-center justify-between gap-2">
          <Link href="/" className="w-full text-center">
            Cancelar
          </Link>
          <Button
            form={formSubmitted ? "formInfoClient" : undefined}
            type="submit"
            // onClick={() => setStep(step + 1)}
            variant={"default"}
            className="w-full flex items-center gap-2"
          >
            <span>Continue</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      )}
      {step === 2 && (
        <div className="w-full flex items-center justify-between gap-2">
          <Button
            onClick={() => setStep(step - 1)}
            variant={"default"}
            className="w-full flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Volta</span>
          </Button>
          <Link
            href="/order/checkout"
            className={cn("w-full", buttonVariants({ variant: "default" }))}
          >
            <span>Resumo</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </footer>
  );
}
