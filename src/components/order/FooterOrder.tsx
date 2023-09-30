"use client"
import { ArrowLeft, ArrowRight, Send } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { useOrderStore } from "@/context/orderStore"

export function FooterOrder() {
  const { step, setStep } = useOrderStore()
  return (
    <footer className="w-full mt-4">
      {step === 1 && (
        <div className="w-full flex items-center justify-between gap-2">
          <Link href="/" className="w-full text-center">
            Cancelar
          </Link>
          <Button
            onClick={() => setStep(step + 1)}
            variant={"default"}
            className="w-full flex items-center gap-2"
          >
            <span>Continuar</span>
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
          <Button
            onClick={() => setStep(step + 1)}
            variant={"default"}
            className="w-full flex items-center gap-2"
          >
            <span>Resumo</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      )}
      {step === 3 && (
        <div className="w-full flex items-center justify-between gap-2">
          <Button
            onClick={() => setStep(step - 1)}
            variant={"default"}
            className="w-full flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Volta</span>
          </Button>
          <Button
            onClick={() => setStep(step + 1)}
            variant={"tertiary"}
            className="w-full flex items-center gap-2 hover:bg-blue-700"
          >
            <span>Enviar</span>
            <Send size={16} />
          </Button>
        </div>
      )}
    </footer>
  )
}
