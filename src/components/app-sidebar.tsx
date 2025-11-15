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
  LayoutDashboard,
  Compass,
  Video,
  Book,
  LifeBuoy,
  Settings,
  GraduationCap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserNav } from './user-nav';

const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/library', label: 'My Library', icon: Video },
  { href: '/courses', label: 'My Courses', icon: Book },
];

const helpMenuItems = [
  { href: '/help', label: 'Help & Support', icon: LifeBuoy },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-foreground font-headline group-data-[collapsible=icon]:hidden">
            EduVerse
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref legacyBehavior>
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
                <Link href={item.href} passHref legacyBehavior>
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
