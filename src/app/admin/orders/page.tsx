import prisma from "@/lib/prisma";

export default async function page() {
  const orders = await prisma.order.findMany({
    include: {
      selectedProducts: true,
    },
  });

  return <pre>{JSON.stringify(orders, null, 2)}</pre>;
}
