"use client";
import { Home, MessageCircle, PackageOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavItem } from "../NavItem";
import { Profile } from "../admin/Profile";
import { Separator } from "../ui/separator";

export function SidebarProfile() {
    const pathname = usePathname();

  return (
    <aside className=' flex flex-col gap-6 border-r border-zinc-200 px-5 py-8'>
      <div className="flex items-center gap-2">
        <NavItem
          active={pathname === "/"}
          icon={Home}
          title={"Home"}
          href="/"
        />

      </div>
      <Separator />
      <nav className='space-y-0.5'>
        <NavItem
          active={pathname === "/profile/orders"}
          icon={PackageOpen}
          title={"Pedidos"}
          href="profile/orders"
        />
        <NavItem
          active={pathname === "/profile/testimonials"}
          icon={MessageCircle}
          title={"Tetimonial"}
          href="/profile/testimonials"
        />
      </nav>
      <div className="mt-auto flex flex-col gap-6">

        <Profile />
      </div>
    </aside>
  );
}
