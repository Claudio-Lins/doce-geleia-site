import Image from "next/image";

export default function AboutPage() {
  return (
    <div className=" min-h-screen w-full bg-white pb-10 md:pt-40">
      <div className="container m-auto px-6 pt-12 text-gray-600 md:px-12 md:pt-0 xl:px-6">
        <div className="space-y-6 md:flex md:gap-6 md:space-y-0 lg:items-center lg:gap-12">
          <div className="md:5/12 flex flex-col items-center justify-center lg:w-5/12">
            <Image
              src="/about/IMG_5910.jpg"
              alt="image"
              width={350}
              height={350}
              className="bg-cover bg-center"
            />
            <div className="h-4 w-full rounded-md bg-zinc-950 md:w-[80%]" />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 md:text-4xl md:tracking-wide">
              Sabores que Transformaram Minha Vida
            </h2>
            <div className="flex flex-col space-y-6">
              <p className=" text-sm leading-relaxed text-zinc-600">
                Após anos trabalhando com festas personalizadas, minha vida deu
                uma volta que nem eu imaginava. Tudo ia muito bem com as festas,
                e eu adorava e curtia cada projeto, até que minha mãe ficou
                doente e passou a ser difícil me dedicar tanto ao ateliê, pois
                independente de idas a médicos e hospitais, eu tinha datas de
                festas a cumprir. Eu já não conseguia me empenhar e entregar o
                tanto que eu gostaria, aplicando todo o carinho em cada detalhe.
                Para ser de qualquer jeito já não fazia sentido para mim.
              </p>
              <p className=" text-sm leading-relaxed text-zinc-600">
                Deixei tudo de lado para me dedicar aos cuidados da minha mãe.
                Eram dias de consultas e idas ao hospital e em uma dessas pausas
                em casa deu vontade de uma geleia de pimenta, e decidi fazer
                para me distrair. Eu nunca tinha feito nem imaginado fazer
                geleia, só deu vontade e fui. O resultado ficou bom, em casa
                todos gostaram e pediram mais. Fiz mais vezes a geleia de
                pimenta e já quis tentar outros sabores, eu estava adorando
                todos aqueles processos e me encantei com o mundo de cores e
                sabores das geleias. Era a minha distração, a minha terapia, era
                o momento que eu desconectava do resto e me conectava comigo.
              </p>
              <p className=" text-sm leading-relaxed text-zinc-600">
                Comecei a criar novos sabores, fazia embalagens especiais e
                presenteava amigos e vizinhos que começaram a perguntar se eu
                aceitava encomendas, que tinham gostado muito e queriam pedir
                mais e perguntaram se eu vendia, e eu pensei “porque não?”.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
