import { ContactForm } from "@/components/email-template/ContactForm"
import { Button } from "@/components/ui/button"
import React from "react"

export default function Contact() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center ">
      <ContactForm />
    </div>
  )
}
