import { ContactForm } from "@/components/email-template/ContactForm";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="flex min-h-screen w-full flex-wrap items-center justify-center pt-20">
      <div className="w-1/2">
        <Image
          src="/assets/karen-comic.jpg"
          alt="contact"
          width={500}
          height={500}
          className="rounded-full"
        />
      </div>
      <ContactForm />
    </div>
  );
}
