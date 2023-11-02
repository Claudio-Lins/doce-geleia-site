import { cn } from "@/lib/utils";
import { ElementType } from "react";

interface NavItemProps {
  icon: ElementType;
  title: string;
  clickHandler?: () => void;
  active: boolean;
}

export function NavItem({
  title,
  icon: Icon,
  clickHandler,
  active,
}: NavItemProps) {
  return (
    <div
      onClick={clickHandler}
      className={cn(
        "group flex cursor-pointer items-center gap-3 rounded px-3 py-2 hover:bg-zinc-100",
        active && "bg-zinc-100",
      )}
    >
      <Icon
        className={cn(
          "h-6 w-6 text-zinc-500",
          active && "animate-pulse text-zinc-700",
        )}
      />
      <span
        className={cn(
          "hidden font-medium text-zinc-700 group-hover:text-zinc-700 md:flex",
          active && "font-extrabold text-zinc-700",
        )}
      >
        {title}
      </span>
    </div>
  );
}
