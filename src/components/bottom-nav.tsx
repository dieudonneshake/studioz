
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clapperboard, History, ThumbsUp, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';

const navItems = [
  { href: '/home', label: 'Home', icon: Home, roles: ['student', 'teacher', 'admin'] },
  { href: '/browse', label: 'Browse', icon: Compass, roles: ['student', 'teacher', 'admin'] },
  { href: '/shorts', label: 'Shorts', icon: Clapperboard, roles: ['student'] },
  { href: '/subscriptions', label: 'Subscriptions', icon: History, roles: ['student'] },
  { href: '/library', label: 'Library', icon: ThumbsUp, roles: ['student'] },
];

const filterMenuByRole = (menu: any[], role: string | undefined) => {
    if (!role) return menu.filter(item => item.roles.includes('student'));
    return menu.filter(item => item.roles.includes(role));
}

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const role = user?.role;

  const visibleNavItems = filterMenuByRole(navItems, role);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background shadow-t-md md:hidden">
      <div className="grid h-16 grid-cols-5 items-center justify-around">
        {visibleNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-xs w-full h-full transition-colors duration-200 ease-in-out',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="truncate text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
