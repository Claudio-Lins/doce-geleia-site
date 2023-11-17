"use client";
import { Home, MessageCircle, PackageOpen, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { JamIcon } from "../../../public/assets/icons/jam-icon";
import { NavItem } from "../NavItem";
import { Separator } from "../ui/separator";
import { Profile } from "./Profile";

export function SidebarAdmin() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <aside className=' flex flex-col gap-6 border-r border-zinc-200 px-5 py-8'>
      <div className="flex items-center gap-2">
        <NavItem
          active={pathname === "/admin"}
          icon={Home}
          title={"Home"}
          href="/"
        />

      </div>
      <Separator />
      <nav className='space-y-0.5'>
        <NavItem
          active={pathname === "/admin/orders"}
          icon={PackageOpen}
          title={"Pedidos"}
          href="/admin/orders"
        />
        <NavItem
          active={pathname === "/admin/testimonials"}
          icon={MessageCircle}
          title={"Tetimonial"}
          href="/admin/testimonials"
        />
        <NavItem
          active={pathname === "/admin/jams"}
          icon={JamIcon}
          title={"Geleias"}
          href="/admin/jams"
        />
        <NavItem
          active={pathname === "/admin/users"}
          icon={Users}
          title={"Usuários"}
          href="/"
        />
      </nav>
      <div className="mt-auto flex flex-col gap-6">

        <Profile />
      </div>
    </aside>
  );
}
