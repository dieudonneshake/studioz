'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clapperboard, History, ThumbsUp, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/shorts', label: 'Shorts', icon: Clapperboard },
  { href: '/history', label: 'History', icon: History },
  { href: '/liked-videos', label: 'Liked', icon: ThumbsUp },
  { href: '/browse', label: 'Browse', icon: Compass },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-xs w-full h-full',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
