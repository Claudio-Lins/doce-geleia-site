import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { ElementType } from 'react'

interface NavItemProps {
  href: string
  icon: ElementType
  title: string
}

export function NavItem({title, href, icon: Icon }:NavItemProps) {
  return (
    <Link
      href={href}
      className='group flex items-center gap-3 px-3 py-2 rounded hover:bg-violet-100 cursor-pointer'>
        <Icon className='h-5 w-5 text-zinc-500' />
      <span className='font-medium text-zinc-700 group-hover:text-violet-950'>
        {title}
        </span>
        <ChevronDown className='ml-auto h-5 w-5 text-zinc-500 group-hover:text-violet-400'/>
      </Link>
  )
}
