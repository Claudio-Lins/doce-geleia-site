import { ElementType } from "react";

interface NavItemProps {
  icon: ElementType;
  title: string;
  clickHandler?: () => void;
}

export function NavItem({ title, icon: Icon, clickHandler }: NavItemProps) {
  return (
    <div
      onClick={clickHandler}
      className="group flex cursor-pointer items-center gap-3 rounded px-3 py-2 hover:bg-zinc-100"
    >
      <Icon className="h-5 w-5 text-zinc-500" />
      <span className="font-medium text-zinc-700 group-hover:text-zinc-700">
        {title}
      </span>
    </div>
  );
}
