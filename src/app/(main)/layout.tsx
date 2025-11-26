"use client";
import { useUser } from "@/firebase";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { GlobalLoader } from '@/components/global-loader';
import { BottomNav } from '@/components/bottom-nav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) return; // Wait until user status is resolved

    const guestAllowedPaths = ['/home', '/browse', '/watch', '/profile', '/search', '/shorts', '/signup', '/login'];
    const isGuestPath = guestAllowedPaths.some(p => pathname.startsWith(p));
    
    if (!user && !isGuestPath) {
       router.push('/login');
    }
    
  }, [user, isUserLoading, router, pathname]);

  if (isUserLoading) {
      return (
        <div className="flex h-screen items-center justify-center">
            <div className="space-y-4 w-full p-8">
                <Skeleton className="h-12 w-1/4" />
                <Skeleton className="h-64 w-full" />
                <div className="grid grid-cols-4 gap-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
        </div>
      )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="overflow-x-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
            {children}
          </main>
        </SidebarInset>
      </div>
      <BottomNav />
      <Suspense>
        <GlobalLoader />
      </Suspense>
    </SidebarProvider>
  )
}
