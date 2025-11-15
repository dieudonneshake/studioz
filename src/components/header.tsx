import { Search, Bell, Mic, GraduationCap, Video } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SidebarTrigger } from './ui/sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { YouTubeLogo } from './youtube-logo';

export default function Header() {
  const isAuthenticated = false; // MOCK: Replace with real auth check

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full shrink-0 items-center justify-between gap-2 border-b bg-background px-2 sm:px-4">
      <div className='flex items-center gap-1 sm:gap-2'>
        <SidebarTrigger className="flex" />
        <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg hidden sm:inline-block">EduVerse</span>
        </Link>
      </div>
      
      <div className="flex flex-1 items-center justify-center gap-2 px-2">
        <div className="relative w-full max-w-xl flex items-center">
          <Input
            type="search"
            placeholder="Search"
            className="w-full rounded-full border-border bg-secondary h-10 pl-4 pr-12 sm:pl-12"
          />
           <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5 text-muted-foreground hidden sm:flex" />
           </div>
          <Button variant="ghost" size="icon" className="rounded-full absolute right-1 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5 text-muted-foreground sm:hidden" />
          </Button>
        </div>
        <Button variant="secondary" size="icon" className="rounded-full flex-shrink-0">
          <Mic className="h-5 w-5" />
          <span className="sr-only">Search with voice</span>
        </Button>
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
