import React from "react"
import PhoneInput from "react-phone-input-2"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const formInfoClientSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  phone: z.string(),
  postalCode: z.string(),
  address: z.string(),
  city: z.string(),
  complement: z.string(),
  observations: z.string(),
})

type FormInfoClientData = z.infer<typeof formInfoClientSchema>

export function FormInfoClient() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInfoClientData>({
    resolver: zodResolver(formInfoClientSchema),
  })

  async function handleFormInfoClient(data: FormInfoClientData) {
    console.log(data)
  }

  return (
    <div className="w-full p-2 rounded-md flex flex-col items-center">
      <form
        onSubmit={handleSubmit(handleFormInfoClient)}
        className="w-full flex flex-col gap-2"
      >
        <div className="flex flex-col md:flex-row items-center w-full gap-2">
          <Input
            type="text"
            placeholder="Primeiro Nome"
            className="w-full"
            {...register("firstName")}
          />
          <Input
            type="text"
            placeholder="Último Nome"
            className="w-full"
            {...register("lastName")}
          />
        </div>
        <div className="flex items-center w-full gap-2">
          <Input
            type="email"
            placeholder="Email"
            className="w-full"
            {...register("email")}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center w-full gap-2">
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
          <Input
            type="text"
            placeholder="Código Postal"
            className="w-full"
            {...register("postalCode")}
          />
        </div>
        <div className="flex items-center w-full gap-2">
          <Input
            type="text"
            placeholder="Morada"
            className="w-full"
            {...register("address")}
          />
        </div>
        <div className="flex items-center w-full gap-2">
          <Input
            type="text"
            placeholder="Conselho"
            className="w-full"
            {...register("city")}
          />
          <Input
            type="text"
            placeholder="Complemento"
            className="w-full"
            {...register("complement")}
          />
        </div>
        <div className="flex items-center w-full gap-2">
          <Textarea
            placeholder="Observações"
            className="w-full"
            {...register("observations")}
          />
        </div>
        <div className="flex items-center w-full gap-2">
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}
