import { useCartStore } from "@/hooks/useCartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formInfoClientSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  phone: z.string(),
  postalCode: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  complement: z.string(),
  observations: z.string(),
});

type FormInfoClientData = z.infer<typeof formInfoClientSchema>;

export function FormInfoClient() {
  const { infoClient, setInfoClient, setStep, step } = useCartStore();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInfoClientData>({
    resolver: zodResolver(formInfoClientSchema),
    defaultValues: {
      firstName: infoClient.firstName,
      lastName: infoClient.lastName,
      email: infoClient.email,
      phone: infoClient.phone,
      postalCode: infoClient.postalCode,
      address: infoClient.address,
      city: infoClient.city,
      country: infoClient.country,
      complement: infoClient.complement,
      observations: infoClient.observations,
    },
  });

  // persist data in localstorage
  // useEffect(() => {
  //   localStorage.setItem("infoClient", JSON.stringify(infoClient))
  // }, [infoClient])

  async function handleFormInfoClient(data: FormInfoClientData) {
    await setInfoClient(data);
    setStep(step + 1);
  }

  return (
    <div className="w-full p-2 rounded-md flex flex-col items-center">
      <form
        id="formInfoClient"
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
          <select
            placeholder="País"
            className="w-full rounded-md border text-sm border-gray-300 p-2"
            {...register("country")}
          >
            <option value="portugal">Portugal</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row items-center w-full gap-2">
          <Input
            type="text"
            placeholder="Código Postal"
            className="w-full"
            {...register("postalCode")}
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
      </form>
    </div>
  );
}
