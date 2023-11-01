import { EmailOrder } from "@/components/email-template/EmailOrder";
import { NextResponse } from "next/server";
import * as React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email } = body;
    const data = await resend.emails.send({
      from: "<order@docegeleia.pt>",
      to: email,
      reply_to: process.env.EMAIL_REPLAY_TO,
      cc: "docegeleiapt@gmail.com",

      subject: "Carrinho de compras",
      react: EmailOrder({
        fullName,
        email,
        totalItems: body.totalItems,
        shippingPrice: body.shippingPrice,
        subTotalPrice: body.subTotalPrice,
        products: body.products,
      }) as React.ReactElement,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
