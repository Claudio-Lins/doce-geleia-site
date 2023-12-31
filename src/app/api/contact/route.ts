import { EmailContact } from "@/components/email-template/EmailContact"
import { NextResponse } from "next/server"
import { Resend } from "resend"
import * as React from "react"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, message } = body
    const data = await resend.emails.send({
      from: "Doce Geleia - Contacto <karen@docegeleia.pt>",
      to: email,
      cc: ["klaulins@gmail.com"],
      subject: "Contacto - Doce Geleia",
      react: EmailContact({
        name: name,
        phone: phone,
        email: email,
        message: message,
      }) as React.ReactElement,
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
