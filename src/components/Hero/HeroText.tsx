import Link from "next/link";

export function HeroText() {
  return (
    <div className="mt-16 flex w-full max-w-xs flex-col space-y-4 rounded-lg bg-transparent bg-opacity-50 p-6 md:mt-0 md:max-w-md">
      <h1 className="font-oldStandardTT text-5xl font-bold text-white">
        Doce Geleia
      </h1>
      <hr className="my-2" />
      <div className="mt-2 flex flex-col space-y-4 text-xs leading-relaxed text-white antialiased md:text-sm md:leading-6">
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
        className="mt-12 rounded-lg border px-8 py-2 text-center text-white transition-all duration-700 hover:bg-zinc-50 hover:text-zinc-900"
      >
        Sabores
      </Link>
    </div>
  );
}
