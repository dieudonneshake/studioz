
"use client";

import { Search, Bell, Mic, Video, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SidebarTrigger } from './ui/sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import Image from 'next/image';


export default function Header() {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full shrink-0 items-center justify-between gap-2 border-b bg-background px-2 sm:px-4">
      <div className='flex items-center gap-1 sm:gap-2'>
        <SidebarTrigger>
            <Menu />
        </SidebarTrigger>
        <Link href="/" className="flex items-center gap-2">
            <Image src="/Ederaxy.png" alt="Ederaxy Logo" width={28} height={28} className="h-7 w-7" />
            <span className="font-bold text-lg hidden sm:inline-block">Ederaxy</span>
        </Link>
      </div>
      
      <div className="flex flex-1 items-center justify-center gap-2 px-2">
        <div className="relative w-full max-w-xl flex items-center">
          <Input
            type="search"
            placeholder="Search"
            className="w-full rounded-full border-border bg-secondary h-10 pl-10 pr-4 sm:pl-12"
          />
           <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5 text-muted-foreground" />
           </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Video className="h-5 w-5" />
              <span className="sr-only">Upload Video</span>
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <UserNav />
          </>
        ) : (
          <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                  <Link href="/login">Log In</Link>
              </Button>
              <Button asChild className="hidden sm:flex">
                  <Link href="/signup">Sign Up</Link>
              </Button>
          </div>
        )}
      </div>
    </header>
  );
}
