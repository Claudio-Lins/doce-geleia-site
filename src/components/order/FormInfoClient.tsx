import React from "react"
import PhoneInput from "react-phone-input-2"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

export function FormInfoClient() {
  return (
    <div className="w-full p-2 rounded-md flex flex-col items-center">
      <form className="w-full flex flex-col gap-2">
        <div className="flex flex-col md:flex-row items-center w-full gap-2">
          <Input type="text" placeholder="Nome" className="w-full" />
          <Input type="text" placeholder="Apelido" className="w-full" />
        </div>
        <div className="flex items-center w-full gap-2">
          <Input type="email" placeholder="Email" className="w-full" />
        </div>
        <div className="flex flex-col md:flex-row items-center w-full gap-2">
          <PhoneInput
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
            value={""}
            onChange={(phone) => console.log(phone)}
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
            }}
          />
          <Input type="text" placeholder="Código Postal" className="w-full" />
        </div>
        <div className="flex items-center w-full gap-2">
          <Input type="text" placeholder="Morada" className="w-full" />
        </div>
        <div className="flex items-center w-full gap-2">
          <Input type="text" placeholder="Conselho" className="w-full" />
          <Input type="text" placeholder="Complemento" className="w-full" />
        </div>
        <div className="flex items-center w-full gap-2">
          <Textarea placeholder="Observações" className="w-full" />
        </div>
      </form>
    </div>
  )
}
