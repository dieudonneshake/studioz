
'use client';

import { FormEvent } from 'react';
import { Search, Bell, Video, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SidebarTrigger } from './ui/sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import Image from 'next/image';
import { useSearchStore } from '@/store/search';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { isAuthenticated } = useAuthStore();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const router = useRouter();


  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };


  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b bg-background px-2 sm:px-4">
      <div className='flex items-center gap-1 sm:gap-2'>
        <SidebarTrigger>
            <Menu />
        </SidebarTrigger>
        <Link href="/" className="flex items-center gap-2">
            <Image src="/Ederaxy1.png" alt="Ederaxy Logo" width={40} height={40} className="h-10 w-10" />
            <span className="font-bold text-lg hidden sm:inline-block">Ederaxy</span>
        </Link>
      </div>
      
       <div className="flex flex-1 items-center justify-center gap-2 px-2">
         <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xl">
             <div className="relative flex items-center">
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
               <Input
                type="search"
                placeholder="Search"
                className="w-full rounded-full border-border bg-secondary h-10 pl-10 pr-4 sm:pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
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
