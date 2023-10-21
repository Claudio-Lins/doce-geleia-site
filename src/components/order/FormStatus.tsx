import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface FormStatusProps {
  order: any;
}

const orderSchema = z.object({
  id: z.string(),
  statusOrder: z.enum(["PENDING", "PREPERING", "CANCELED", "DELIVERED"]),
  statusPayment: z.enum(["PENDING", "PAID", "CANCELED"]),
  delivered: z.boolean(),
});

export type StatusOrderData = z.infer<typeof orderSchema>;

export function FormStatus({ order }: FormStatusProps) {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StatusOrderData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      id: order.id,
      statusOrder: order.statusOrder,
      statusPayment: order.statusPayment,
      delivered: order.delivered,
    },
  });

  async function handleFormOrderStatus(data: StatusOrderData) {
    await fetch(`/api/order`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    route.refresh();
    toast.success("Pedido atualizado com sucesso");
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm flex flex-col gap-2">
      <form
        onSubmit={handleSubmit(handleFormOrderStatus)}
        className="gap-2 flex flex-col"
      >
        <div className="flex items-center gap-2 justify-center">
          <div className="w-full">
            <div className="ml-2 mb-1 text-sm font-medium">
              <span>Status do pedido</span>
            </div>
            <select
              placeholder="Status do pedido"
              className="w-full rounded-md border text-sm border-gray-300 p-2"
              {...register("statusOrder")}
            >
              <option value="PENDING">Pendente</option>
              <option value="PREPERING">Preparando</option>
              <option value="CANCELED">Cancelado</option>
              <option value="DELIVERED">Entregue</option>
            </select>
          </div>
          <div className="w-full">
            <div className="ml-2 mb-1 text-sm font-medium">
              <span>Status do pagamento</span>
            </div>
            <select
              placeholder="Status do Pagamento"
              className="w-full rounded-md border text-sm border-gray-300 p-2"
              {...register("statusPayment")}
            >
              <option value="PENDING">Pendente</option>
              <option value="PAID">Pago</option>
              <option value="CANCELED">Cancelado</option>
            </select>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-end mb-2 gap-2">
          <Button className="w-1/4" type="submit">
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
}
