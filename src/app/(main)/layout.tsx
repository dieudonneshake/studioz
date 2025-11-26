"use client";
import { useUser } from "@/firebase";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) return; // Wait until user status is resolved

    const guestAllowedPaths = ['/home', '/browse', '/watch', '/profile', '/search', '/shorts'];
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

  return <>{children}</>;
}
