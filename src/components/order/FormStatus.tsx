import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CookingPot } from "@phosphor-icons/react";
import { Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface FormStatusProps {
  order: any;
}
// const FormStatusPreperingSchema = z.object({
//   fullName: z.string().min(3),
// });

const orderSchema = z.object({
  id: z.string(),
  statusOrder: z.enum([
    "PENDING",
    "PREPERING",
    "CANCELED",
    "SHIPPED",
    "DELIVERED",
  ]),
  statusPayment: z.enum(["PENDING", "PAID", "CANCELED"]),
  delivered: z.boolean(),
});

export type StatusOrderData = z.infer<typeof orderSchema>;
// export type FormStatusPreperingData = z.infer<typeof FormStatusPreperingSchema>;

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

  async function handleFormOrderPrepering(data: StatusOrderData) {
    const response = await fetch("/api/email-order-prepering", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Pedido enviado com sucesso!");
    } else {
      toast.error("Erro ao enviar o pedido");
    }
  }

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
    <div className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm">
      <form
        onSubmit={handleSubmit(handleFormOrderStatus)}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center justify-center gap-2">
          <div className="w-full">
            <div className="mb-1 ml-2 text-sm font-medium">
              <span>Status do pedido</span>
            </div>
            <select
              placeholder="Status do pedido"
              className="w-full rounded-md border border-gray-300 p-2 text-sm"
              {...register("statusOrder")}
            >
              <option value="PENDING">Pendente</option>
              <option value="PREPERING">Preparando</option>
              <option value="CANCELED">Cancelado</option>
              <option value="SHIPPED">Enviado</option>
              <option value="DELIVERED">Entregue</option>
            </select>
          </div>
          <div className="w-full">
            <div className="mb-1 ml-2 text-sm font-medium">
              <span>Status do pagamento</span>
            </div>
            <select
              placeholder="Status do Pagamento"
              className="w-full rounded-md border border-gray-300 p-2 text-sm"
              {...register("statusPayment")}
            >
              <option value="PENDING">Pendente</option>
              <option value="PAID">Pago</option>
              <option value="CANCELED">Cancelado</option>
            </select>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="mb-2 flex items-center justify-end gap-2">
          <Button
            variant={
              order.statusOrder === "PREPERING" ? "outline" : "secondary"
            }
            onClick={() => handleFormOrderPrepering(order)}
            className="flex w-1/4 items-center justify-center gap-2"
            type="button"
          >
            <span>Preparando</span>
            <CookingPot
              className={cn(
                "h-4 w-4",
                order.statusOrder === "PREPERING" && "animate-bounce",
              )}
            />
          </Button>
          <Button
            variant={
              order.statusOrder === "SHIPPED" ? "destructive" : "secondary"
            }
            onClick={() => handleFormOrderPrepering(order)}
            className="flex w-1/4 items-center justify-center gap-2"
            type="button"
          >
            <span>Enviado</span>
            <Truck
              className={cn(
                "h-4 w-4",
                order.statusOrder === "SHIPPED" && "animate-bounce",
              )}
            />
          </Button>
          <Button className="w-1/4" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}
