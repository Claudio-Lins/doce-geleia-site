"use client";

import { useRouter } from "next/navigation";

export function Redirect() {
  const router = useRouter();
  router.push("/auth/login");
  return;
}
