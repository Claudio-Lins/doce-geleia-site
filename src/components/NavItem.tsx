import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { ElementType } from 'react'

interface NavItemProps {
  href: string
  icon: ElementType
  title: string
  active: boolean
}

export function NavItem({title, active, href, icon: Icon }:NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex items-center gap-3 px-3 py-2 rounded hover:bg-violet-100 cursor-pointer',
        active && 'bg-violet-100 shadow-sm'
      )}>
        <Icon className='h-5 w-5 text-zinc-500' />
      <span className='font-medium text-zinc-700 group-hover:text-violet-950'>
        {title}
        </span>
      {
        active && (
          <Check className='ml-auto h-5 w-5 text-zinc-500 group-hover:text-violet-400'/>
        )
        }
      </Link>
  )
}
