"use client";
import { useCartStore } from "@/hooks/useCartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formInfoClientSchema = z.object({
  userId: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string().min(12),
  postalCode: z.string().min(4),
  address: z.string().min(3),
  city: z.string().min(3),
  country: z.string().default("portugal"),
  complement: z.string(),
  observations: z.string(),
});

type FormInfoClientData = z.infer<typeof formInfoClientSchema>;

export function FormInfoClient() {
  const { data: session, status } = useSession();
  const { infoClient, setInfoClient, setStep, step, userId, setUserId } =
    useCartStore();

  useEffect(() => {
    if (session) {
      setUserId(session?.user?.id!);
    }
  }, [session, setUserId]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInfoClientData>({
    resolver: zodResolver(formInfoClientSchema),
    defaultValues: {
      userId: userId,
      fullName: session ? session?.user?.name! : infoClient.fullName,
      email: session ? session?.user?.email! : infoClient.email,
      phone: infoClient.phone,
      postalCode: infoClient.postalCode,
      address: infoClient.address,
      city: infoClient.city,
      country: infoClient.country,
      complement: infoClient.complement,
      observations: infoClient.observations,
    },
  });

  async function handleFormInfoClient(data: FormInfoClientData) {
    setInfoClient(data);
    setStep(step + 1);
  }

  return (
    <div className="flex w-full flex-col items-center rounded-md p-2">
      <form
        id="formInfoClient"
        onSubmit={handleSubmit(handleFormInfoClient)}
        className="flex w-full flex-col gap-2"
      >
        <div className="flex w-full flex-col items-center gap-2 md:flex-row">
          <div className="itmes-cneter flex w-full flex-col">
            <Input
              type="text"
              placeholder="Nome e Apelido"
              className="w-full"
              value={session?.user?.name!}
              {...register("fullName")}
            />
            <small className="mt-2 text-red-600">
              {errors.fullName && "Campo obrigatório"}
            </small>
          </div>
          {/* <div className="itmes-cneter flex w-full flex-col">
            <Input
              type="text"
              placeholder="Apelido"
              className="w-full"
              value={session?.data?.user?.name!}
              {...register("lastName")}
            />
            <small className="mt-2 text-red-600">
              {errors.lastName && "Campo obrigatório"}
            </small>
          </div> */}
        </div>
        <div className="flex w-full items-center gap-2">
          <div className="itmes-cneter flex w-full flex-col">
            <Input
              type="email"
              placeholder="Email"
              className="w-full"
              value={session?.user?.email!}
              {...register("email")}
            />
            <small className="mt-2 text-red-600">
              {errors.email && "Campo obrigatório"}
            </small>
          </div>
          <div className="itmes-cneter flex w-full flex-col">
            <Controller
              control={control}
              name="phone"
              rules={{ required: true }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  inputStyle={{
                    color: "rgb(19, 19, 27)",
                    height: "42px",
                    fontSize: "14px",
                    fontWeight: "400",
                    fontSmooth: "auto",
                    width: "100%",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    outline: "none",
                  }}
                  containerStyle={{ margin: "0px" }}
                  buttonStyle={{}}
                  dropdownStyle={{ height: "150px" }}
                  country={"pt"}
                  onChange={field.onChange} // Use field.onChange para atualizar o valor
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                />
              )}
            />
            <small className="mt-2 text-red-600">
              {errors.phone && "Campo obrigatório"}
            </small>
          </div>
        </div>

        <div className="flex w-full items-center gap-2">
          <div className="itmes-cneter flex w-full flex-col">
            <Input
              type="text"
              placeholder="Morada"
              className="w-full"
              {...register("address")}
            />
            <small className="mt-2 text-red-600">
              {errors.address && "Campo obrigatório"}
            </small>
          </div>
        </div>
        <div className="flex w-full items-center gap-2">
          <div className="itmes-cneter flex w-full flex-col">
            <Input
              type="text"
              placeholder="Conselho"
              className="w-full"
              {...register("city")}
            />
            <small className="mt-2 text-red-600">
              {errors.city && "Campo obrigatório"}
            </small>
          </div>

          <select
            placeholder="País"
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
            {...register("country")}
          >
            <option value="portugal">Portugal</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div className="flex w-full flex-col items-center gap-2 md:flex-row">
          <div className="itmes-cneter flex w-full flex-col">
            <Input
              type="text"
              placeholder="Código Postal"
              className="w-full"
              {...register("postalCode")}
            />
            <small className="mt-2 text-red-600">
              {errors.postalCode && "Campo obrigatório"}
            </small>
          </div>
          <div className="itmes-cneter flex w-full flex-col">
            <Input
              type="text"
              placeholder="Complemento"
              className="w-full"
              {...register("complement")}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-2">
          <Textarea
            placeholder="Observações"
            className="w-full"
            {...register("observations")}
          />
        </div>
      </form>
    </div>
  );
}
