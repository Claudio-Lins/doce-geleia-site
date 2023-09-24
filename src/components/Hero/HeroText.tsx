import Link from "next/link"

export function HeroText() {
  return (
    <div className="bg-white flex flex-col space-y-4 w-full max-w-xs md:max-w-md p-6 rounded-lg backdrop-blur-sm bg-opacity-50 mt-16 md:mt-0">
      <h1 className="text-4xl font-oldStandardTT font-bold">Doce Geleia</h1>
      <hr className="my-2" />
      <div className="flex flex-col space-y-4 mt-2 text-xs md:text-sm font-light leading-relaxed md:leading-6">
        <p className="">
          A geleia artesanal é um produto delicioso e saudável, feito à base de
          frutas frescas e sem adição de conservantes. É uma otima opção para
          quem busca uma alimentação mais natural e nutritiva.
        </p>
        <p className="">
          As frutas utilizadas na preparação da geleia artesanal são
          selecionadas a dedo, para garantir o sabor e a qualidade do produto. O
          processo de fabricação é todo artesanal, o que torna a geleia ainda
          mais especial.
        </p>
        <p className="">
          A Doce Geleia é uma empresa familiar, que busca oferecer um produto de
          qualidade e sabor único. Acreditamos que a alimentação saudável e
          natural é essencial para uma vida mais feliz e saudável.
        </p>
      </div>
      <Link
        href="/products"
        className="border px-8 rounded-lg py-2 text-center transition-all duration-700 hover:bg-zinc-50 hover:text-zinc-900 mt-12"
      >
        Sabores
      </Link>
    </div>
  )
}
