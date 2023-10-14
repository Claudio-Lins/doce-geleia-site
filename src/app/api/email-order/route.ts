import { NextResponse } from "next/server"
import { Resend } from "resend"
import * as React from "react"
import { EmailOrder } from "@/components/email-template/EmailOrder"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email } = body
    const data = await resend.emails.send({
      from: "Order - Carrinho de compras <order@docegeleia.pt>",
      to: email,
      cc: process.env.EMAIL_DOCE,
      subject: "Order - Carrinho de compras",
      react: EmailOrder({
        firstName,
        lastName,
        email,
        totalItems: body.totalItems,
        shippingPrice: body.shippingPrice,
        subTotalPrice: body.subTotalPrice,
        products: body.products,
      }) as React.ReactElement,
    })
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}