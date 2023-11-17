"use client";
import { LogOut } from 'lucide-react';
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function Profile() {
  const { data: session } = useSession();
  return (
     <div className="flex items-center gap-2">
          <Avatar>
          <AvatarImage src={session?.user.image} />
          <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-zinc-700">
              {session?.user.name}
            </span>
            <span className="text-sm text-zinc-500">{session?.user.email}</span>
        </div>
      <button
        onClick={() => signOut()}
        className='ml-auto p-2 hover:bg-zinc-50 rounded-md'>
        <LogOut className='w-5 h-5 text-zinc-500' />
      </button>
          </div>

  )
}
