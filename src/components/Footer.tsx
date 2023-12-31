import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-zinc-950 print:hidden">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Link href="/">
            <Image
              className="h-20 w-auto"
              src="/logo/logo-pos.svg"
              alt="Logo"
              width={68}
              height={68}
            />
          </Link>
        </div>

        {/* <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
          consequuntur amet culpa cum itaque neque.
        </p> */}

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-white md:gap-8 lg:gap-12">
          <Link href="/products">Produtos</Link>
          <Link href="/about">Sobre</Link>
          <Link href="/contact">Contato</Link>
        </div>

        <div className="mt-12 flex justify-center gap-6 md:gap-8">
          <Link
            href="https://www.instagram.com/docegeleia.pt/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-zinc-50"
          >
            <Instagram className="text-white" size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
