"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useOrderStore } from "@/hooks/useOrderStore";
import { MessageCircle, PackageOpen } from "lucide-react";
import { useSession } from "next-auth/react";
import { Separator } from "../ui/separator";
import { NavItem } from "./NavItem";

export function Sidebar() {
  const { data: session } = useSession();
  const { setShowOrderHistory, setShowTestimonial } = useOrderStore();

  function handleOrderHistoryClick() {
    setShowOrderHistory(true);
    setShowTestimonial(false);
  }

  function handleTestimonialClick() {
    setShowTestimonial(true);
    setShowOrderHistory(false);
  }

  return (
    <aside className=" flex flex-col gap-6 border-r border-zinc-200 px-5 py-8">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={session?.user.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>{session?.user.name}</span>
      </div>
      <Separator />
      <nav className="space-y-0.5">
        <NavItem
          icon={PackageOpen}
          title={"Pedidos"}
          clickHandler={handleOrderHistoryClick}
        />
        <NavItem
          icon={MessageCircle}
          title={"Tetimonial"}
          clickHandler={handleTestimonialClick}
        />
      </nav>
    </aside>
  );
}
