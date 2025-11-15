import { Search, Upload, Bell, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SidebarTrigger } from './ui/sidebar';
import { ThemeToggle } from './theme-toggle';
import { UserNav } from './user-nav';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-2 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="flex md:hidden" />
        <Link href="/" className="hidden items-center gap-2 md:flex">
          <GraduationCap className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-foreground font-headline hidden md:block">
            EduVerse
          </h1>
        </Link>
      </div>

      <div className="flex flex-1 justify-center px-4 md:px-0">
        <div className="relative w-full max-w-2xl">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
            type="search"
            placeholder="Search videos..."
            className="w-full rounded-full bg-secondary pl-8"
            />
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Upload className="h-5 w-5" />
          <span className="sr-only">Upload</span>
        </Button>
        <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
        </Button>
        <ThemeToggle />
        <UserNav isCollapsed={true} />
      </div>
    </header>
  );
}
