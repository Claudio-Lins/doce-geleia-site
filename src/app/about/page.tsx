import Image from "next/image"
import React from "react"

export default function AboutPage() {
  return (
    <div className=" bg-white md:pt-40 w-full min-h-screen">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6 pt-12 md:pt-0">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12 items-center flex flex-col justify-center">
            <Image
              src="/about/IMG_5910.jpg"
              alt="image"
              width={350}
              height={350}
              className="bg-cover bg-center"
            />
            <div className="bg-zinc-950 w-full md:w-[80%] h-4 rounded-md" />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl md:tracking-wide mb-6">
              Sabores que Transformaram Minha Vida
            </h2>
            <div className="flex flex-col space-y-6">
              <p className=" text-zinc-600 text-sm leading-relaxed">
                Após anos trabalhando com festas personalizadas, minha vida deu
                uma volta que nem eu imaginava. Tudo ia muito bem com as festas,
                e eu adorava e curtia cada projeto, até que minha mãe ficou
                doente e passou a ser difícil me dedicar tanto ao ateliê, pois
                independente de idas a médicos e hospitais, eu tinha datas de
                festas a cumprir. Eu já não conseguia me empenhar e entregar o
                tanto que eu gostaria, aplicando todo o carinho em cada detalhe.
                Para ser de qualquer jeito já não fazia sentido para mim.
              </p>
              <p className=" text-zinc-600 text-sm leading-relaxed">
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
              <p className=" text-zinc-600 text-sm leading-relaxed">
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
  )
}
