import { SelectedProduct } from "@/@types";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface OrderProps {
  orderNumber: string;
  statusPayment: "PENDING" | "PAID" | "CANCELED";
  statusOrder: "PENDING" | "PREPERING" | "CANCELED" | "DELIVERED";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postalCode: string;
  address: string;
  city: string;
  country: string;
  complement?: string;
  observations?: string;
  totalAmount: number;
  delivered: boolean;
  selectedProduct: SelectedProduct[];
}

export async function POST(request: Request, response: Response) {
  const body = await request.json();

  const order: OrderProps = {
    orderNumber: body.orderNumber,
    statusPayment: body.statusPayment,
    statusOrder: body.statusOrder,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    postalCode: body.postalCode,
    address: body.address,
    city: body.city,
    country: body.country,
    complement: body.complement,
    observations: body.observations,
    totalAmount: body.totalAmount,
    delivered: body.delivered,
    selectedProduct: body.selectedProduct,
  };

  try {
    const data = await prisma.order.create({
      data: {
        orderNumber: order.orderNumber,
        statusPayment: order.statusPayment,
        statusOrder: order.statusOrder,
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        phone: order.phone,
        postalCode: order.postalCode,
        address: order.address,
        city: order.city,
        country: order.country,
        complement: order.complement,
        observations: order.observations,
        totalAmount: order.totalAmount,
        delivered: order.delivered,
        selectedProduct: {
          create: order.selectedProduct,
        },
      },
    });
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
