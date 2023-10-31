import { Button } from "../ui/button";

export function UserTestimonial() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">
        Comente aqui o que achou da Doce Geleia.
      </h1>
      <p className="text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia a,
        similique veritatis blanditiis odit quasi asperiores, explicabo!
      </p>
      <form className="-w-full flex flex-col space-y-4">
        <textarea className="mt-4 h-40 w-full rounded-lg border p-2" />
        <Button className="ml-auto w-2/5">Enviar</Button>
      </form>
    </div>
  );
}
