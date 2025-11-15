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
  Settings,
  LifeBuoy,
  Compass,
  LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainMenuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/browse', label: 'Browse', icon: Compass },
  { href: '/subscriptions', label: 'Subscriptions', icon: Video },
  { href: '/history', label: 'History', icon: Book },
];

const libraryMenuItems = [
    { href: '/library', label: 'Library', icon: Library },
    { href: '/my-videos', label: 'Your Videos', icon: Video },
    { href: '/watch-later', label: 'Watch Later', icon: Book },
    { href: '/liked-videos', 'label': 'Liked Videos', icon: Flame },
];


const helpMenuItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/help', label: 'Help', icon: LifeBuoy },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 justify-center items-center h-16 border-b hidden md:flex">
         <SidebarMenuButton icon={<div />} tooltip="EduVerse" asChild>
            <Link href="/" className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">E</span>
            </Link>
         </SidebarMenuButton>
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
          <h2 className="px-4 py-2 text-lg font-semibold tracking-tight group-data-[collapsible=icon]:hidden">Library</h2>
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
      </SidebarFooter>
    </Sidebar>
  );
}
