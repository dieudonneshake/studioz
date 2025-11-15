import { Search, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SidebarTrigger } from './ui/sidebar';
import { ThemeToggle } from './theme-toggle';
import { UserNav } from './user-nav';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="hidden md:block">
        <SidebarTrigger />
      </div>

      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search videos..."
          className="w-full rounded-lg bg-secondary pl-8 md:w-[300px] lg:w-[400px]"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
        <ThemeToggle />
        <div className="hidden md:block">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
