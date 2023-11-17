
import { ContentAdminJams } from "@/components/admin/ContentAdminJams";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/lib/api";
import { getSession } from "@/lib/session";
import { Testimonial } from "@prisma/client";
import Link from "next/link";

async function getAllTestimonials(): Promise<Testimonial[]> {
  const response = await api("/testimonials", { next: { revalidate: 1 } });
  const testimonials = await response.json();
  return testimonials;
}

export default async function Jams() {
  const testimonials = await getAllTestimonials();
  const session = await getSession();
  if (session?.role !== "ADMIN") {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
        <p>You are not authorized to view this page!</p>;
        {session?.role && <p>Your role is {session?.role}</p>}
        <Link
          href="/auth/login"
          className={buttonVariants({ variant: "outline" })}
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-10">
      <ScrollArea className="h-[calc(100vh_-_50px)] pr-4">
      <ContentAdminJams />
      </ScrollArea>
    </div>
  )
}
