
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
  History,
  Settings,
  LifeBuoy,
  Compass,
  LayoutDashboard,
  Flame,
  Search,
  PlusSquare,
  Shield,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

const mainMenuItems = [
    { href: '/home', label: 'Home', icon: Home, roles: ['student', 'teacher', 'admin'] },
    { href: '/browse', label: 'Browse', icon: Compass, roles: ['student', 'teacher', 'admin'] },
    { href: '/shorts', label: 'Shorts', icon: Clapperboard, roles: ['student'] },
    { href: '/subscriptions', label: 'Subscriptions', icon: Video, roles: ['student'] },
];

const libraryMenuItems = [
    { href: '/library', label: 'Library', icon: Library, roles: ['student'] },
    { href: '/history', label: 'History', icon: History, roles: ['student'] },
    { href: '/my-videos', label: 'Your Videos', icon: Video, roles: ['teacher'] },
    { href: '/watch-later', label: 'Watch Later', icon: PlusSquare, roles: ['student'] },
    { href: '/liked-videos', 'label': 'Liked Videos', icon: Flame, roles: ['student'] },
];

const secondaryMenuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['teacher'] },
]

const adminMenuItems = [
    { href: '/admin/dashboard', label: 'Admin Dashboard', icon: Shield, roles: ['admin'] },
    { href: '/admin/users', label: 'Manage Users', icon: Users, roles: ['admin'] },
]

const helpMenuItems = [
  { href: '/settings', label: 'Settings', icon: Settings, roles: ['student', 'teacher', 'admin'] },
  { href: '/help', label: 'Help', icon: LifeBuoy, roles: ['student', 'teacher', 'admin'] },
];

const filterMenuByRole = (menu: any[], role: string | undefined) => {
    if (!role) return menu.filter(item => item.roles.includes('student')); // Default to student view if not logged in
    return menu.filter(item => item.roles.includes(role));
}


export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const role = user?.role;

  const visibleMainMenuItems = filterMenuByRole(mainMenuItems, role);
  const visibleLibraryMenuItems = filterMenuByRole(libraryMenuItems, role);
  const visibleSecondaryMenuItems = filterMenuByRole(secondaryMenuItems, role);
  const visibleAdminMenuItems = filterMenuByRole(adminMenuItems, role);
  const visibleHelpMenuItems = filterMenuByRole(helpMenuItems, role);


  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 justify-center items-center h-16 border-b hidden md:flex">
         <SidebarMenuButton icon={<div />} tooltip="EduVerse" asChild>
            <Link href="/home" className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">E</span>
            </Link>
         </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {visibleMainMenuItems.map((item) => (
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
       
       {visibleLibraryMenuItems.length > 0 && (
          <SidebarMenu>
            <h2 className="px-4 py-2 text-lg font-semibold tracking-tight group-data-[collapsible=icon]:hidden">Library</h2>
            {visibleLibraryMenuItems.map((item) => (
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
        )}

         {visibleSecondaryMenuItems.length > 0 && (
            <SidebarMenu>
            <h2 className="px-4 py-2 text-lg font-semibold tracking-tight group-data-[collapsible=icon]:hidden">You</h2>
            {visibleSecondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                <Link href={item.href}>
                    <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    icon={<item.icon />}
                    tooltip={item.label}
                    >
                    {item.label}
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
         )}

         {visibleAdminMenuItems.length > 0 && (
            <SidebarMenu>
            <h2 className="px-4 py-2 text-lg font-semibold tracking-tight group-data-[collapsible=icon]:hidden">Admin</h2>
            {visibleAdminMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                <Link href={item.href}>
                    <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    icon={<item.icon />}
                    tooltip={item.label}
                    >
                    {item.label}
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
         )}
      </SidebarContent>
      <SidebarFooter className="p-2">
         <div className="flex flex-col gap-1">
            {visibleHelpMenuItems.map((item) => (
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
