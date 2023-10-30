import { EmailOrderPrepering } from "@/components/email-template/EmailOrderPrepering";
import { NextResponse } from "next/server";
import * as React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, orderNumber } = body;
    const data = await resend.emails.send({
      from: "Order - Preparação <order@docegeleia.pt>",
      to: email,
      reply_to: process.env.EMAIL_REPLAY_TO,
      // cc: process.env.EMAIL_CC,
      subject: "Order - Preparação de encomenda",
      react: EmailOrderPrepering({
        fullName,
        email,
        orderNumber,
      }) as React.ReactElement,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}