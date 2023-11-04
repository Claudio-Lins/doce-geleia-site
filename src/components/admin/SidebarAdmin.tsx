"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useOrderStore } from "@/hooks/useOrderStore";
import { MessageCircle, PackageOpen } from "lucide-react";
import { useSession } from "next-auth/react";
import { JamIcon } from "../../../public/assets/icons/jam-icon";
import { NavItem } from "../NavItem";
import { Separator } from "../ui/separator";

export function SidebarAdmin() {
  const { data: session } = useSession();
  const {
    setShowOrderHistory,
    setShowTestimonial,
    showOrderHistory,
    showTestimonial,
    setShowJams,
    showJams,
  } = useOrderStore();

  function handleOrderHistoryClick() {
    setShowOrderHistory(true);
    setShowTestimonial(false);
    setShowJams(false);
  }

  function handleTestimonialClick() {
    setShowJams(false);
    setShowTestimonial(true);
    setShowOrderHistory(false);
  }

  function handleJamsClick() {
    setShowJams(true);
    setShowTestimonial(false);
    setShowOrderHistory(false);
  }

  return (
    <aside className="flex flex-col gap-6 border-r border-zinc-200 px-0 py-0 md:px-5 md:py-8">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={session?.user.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="hidden md:flex">{session?.user.name}</span>
      </div>
      <Separator />
      <nav className="w-12 space-y-0.5 md:w-full">
        <NavItem
          active={showOrderHistory}
          icon={PackageOpen}
          title={"Pedidos"}
          clickHandler={handleOrderHistoryClick}
        />
        <NavItem
          active={showTestimonial}
          icon={MessageCircle}
          title={"Tetimonial"}
          clickHandler={handleTestimonialClick}
        />
        <NavItem
          active={showJams}
          icon={JamIcon}
          title={"Geleias"}
          clickHandler={handleJamsClick}
        />
      </nav>
    </aside>
  );
}
