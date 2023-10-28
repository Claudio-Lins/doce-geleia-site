import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function AdminPage() {
  const session = await getSession();
  console.log({ session });
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
    <div className="flex min-h-screen w-full items-center justify-center">
      <p>You are an admin, welcome!</p>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>
  );
}
