"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export function Role() {
  const { data: session } = useSession();
  const Router = useRouter();

  useEffect(() => {
    if (session?.user.role !== "ADMIN") {
      Router.push("/auth/login");
    }
  }, [session]);
  return (
    <div>fdasdgfsdfgsd</div>
  )
}
