"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useToast } from "@/components/ui/use-toast"

const ContactFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10),
})

export type ContactFormData = z.infer<typeof ContactFormSchema>

export function ContactForm() {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>()

  async function sendEmail(data: ContactFormData) {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      alert("Email sent!")
      reset()
    } else {
      alert("Something went wrong!")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(sendEmail)}
      className="flex flex-col gap-4 w-full max-w-sm p-4 bg-white rounded-md shadow-md"
      noValidate
      autoComplete="off"
    >
      <Input
        type="text"
        placeholder="Name"
        {...register("name", { required: true })}
      />
      <Input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
      />
      <Input
        type="tel"
        placeholder="Phone"
        {...register("phone", { required: true })}
      />
      <Textarea
        placeholder="Message"
        {...register("message", { required: true })}
      />
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  )
}
