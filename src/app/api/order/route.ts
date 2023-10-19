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
  selectedProducts: SelectedProduct[];
}

export async function GET(request: Request, response: Response) {
  try {
    const data = await prisma.order.findMany({
      include: {
        selectedProducts: true,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
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
    selectedProducts: body.selectedProducts,
  };

  try {
    const createdOrder = await prisma.order.create({
      data: {
        ...order,
        selectedProducts: {
          create: order.selectedProducts.map((product) => ({
            title: product.title,
            coverUrl: product.coverUrl,
            price: product.price,
            weight: product.weight,
            netWeight: product.netWeight,
            quantity: product.quantity,
          })),
        },
      },
    });
    console.log(createdOrder);
    return NextResponse.json(createdOrder);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
