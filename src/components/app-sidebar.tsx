'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Home,
  Clapperboard,
  Video,
  Library,
  Book,
  Flame,
  Music,
  Gamepad2,
  Newspaper,
  Trophy,
  Settings,
  LifeBuoy,
  Compass,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserNav } from './user-nav';

const mainMenuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/browse', label: 'Browse', icon: Compass },
  { href: '/shorts', label: 'Shorts', icon: Clapperboard },
  { href: '/subscriptions', label: 'Subscriptions', icon: Video },
];

const libraryMenuItems = [
    { href: '/library', label: 'Library', icon: Library },
    { href: '/history', label: 'History', icon: Book },
    { href: '/my-videos', label: 'Your Videos', icon: Video },
    { href: '/watch-later', label: 'Watch Later', icon: Book },
    { href: '/liked-videos', label: 'Liked Videos', icon: Flame },
];

const exploreMenuItems = [
    { href: '/trending', label: 'Trending', icon: Flame },
    { href: '/music', label: 'Music', icon: Music },
    { href: '/gaming', label: 'Gaming', icon: Gamepad2 },
    { href: '/news', label: 'News', icon: Newspaper },
    { href: '/sports', label: 'Sports', icon: Trophy },
];

const helpMenuItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/report-history', label: 'Report History', icon: Book },
  { href: '/help', label: 'Help', icon: LifeBuoy },
  { href: '/send-feedback', label: 'Send Feedback', icon: Book },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 justify-center items-center h-16 border-b">
         {/* The SidebarTrigger is now in the main Header component */}
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {mainMenuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  icon={<item.icon />}
                  tooltip={item.label}
                >
                  {item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
         <SidebarMenu>
          {libraryMenuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  icon={<item.icon />}
                  tooltip={item.label}
                >
                  {item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarMenu>
            <h2 className="px-4 py-2 text-lg font-semibold tracking-tight group-data-[collapsible=icon]:hidden">Explore</h2>
          {exploreMenuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  icon={<item.icon />}
                  tooltip={item.label}
                >
                  {item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
         <div className="flex flex-col gap-1">
            {helpMenuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    icon={<item.icon />}
                    tooltip={item.label}
                  >
                    {item.label}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
        </div>
        <div className="mt-2 border-t pt-2">
            <div className="group-data-[collapsible=icon]:hidden">
                <UserNav />
            </div>
            <div className="hidden group-data-[collapsible=icon]:block">
                <UserNav isCollapsed />
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
