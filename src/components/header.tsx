import { Search, Upload, Bell, Mic, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SidebarTrigger } from './ui/sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { YouTubeLogo } from './youtube-logo';

export default function Header() {
  const isAuthenticated = false; // MOCK: Replace with real auth check

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full shrink-0 items-center gap-2 border-b bg-background px-4 md:px-6">
      <div className='flex items-center gap-4'>
        <SidebarTrigger className="flex" />
        <Link href="/" className="items-center gap-2 flex">
            <GraduationCap className="h-8 w-8 text-primary" />
            <YouTubeLogo className="hidden md:block" />
        </Link>
      </div>
      
      <div className="flex w-full items-center justify-center gap-2">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="w-full rounded-full border-border bg-background pl-12 pr-4 h-10"
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
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Upload className="h-5 w-5" />
              <span className="sr-only">Upload</span>
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <UserNav />
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                    <Link href="/login">Log In</Link>
                </Button>
                <Button asChild className="hidden sm:flex">
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
