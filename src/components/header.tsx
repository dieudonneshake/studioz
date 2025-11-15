import { Search, Upload, Bell, GraduationCap, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SidebarTrigger } from './ui/sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';

export default function Header() {
  const isAuthenticated = true; // MOCK: Replace with real auth check

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center gap-2 border-b bg-background px-4 md:px-6">
      <div className='flex items-center gap-2'>
        <SidebarTrigger className="flex md:hidden" />
        <Link href="/home" className="items-center gap-2 hidden md:flex">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground font-headline hidden lg:block">
              EduVerse
            </h1>
          </Link>
      </div>
      
      <div className="flex w-full items-center justify-center gap-2">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="w-full rounded-full bg-secondary pl-12 pr-4 h-10"
          />
        </div>
        <Button variant="secondary" size="icon" className="rounded-full flex-shrink-0">
          <Mic className="h-5 w-5" />
          <span className="sr-only">Search with voice</span>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Upload className="h-5 w-5" />
              <span className="sr-only">Upload</span>
            </Button>
            <Button variant="ghost" size="icon" className='hidden md:inline-flex'>
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <UserNav isCollapsed />
          </>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                    <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
