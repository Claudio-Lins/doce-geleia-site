import { ProfileContent } from "@/components/Profile/ProfileContent";
import { Sidebar } from "@/components/Profile/Sidebar";
import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function MinhaConta() {
  const session = await getSession();

  if (session?.role !== "USER") {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
        <p>Área no permitida!</p>;
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
    <div className="mx-auto mb-20 mt-28 w-full max-w-6xl overflow-hidden border-t p-4 shadow-sm md:rounded-xl md:border">
      <div className="grid-cols-appMobile grid md:grid-cols-app ">
        <Sidebar />
        <div className="p-4 md:p-10">
          <ProfileContent />
        </div>
      </div>
    </div>
  );
}
