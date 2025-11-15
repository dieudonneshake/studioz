
"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Redirecting to login...</p>
        </div>
    );
  }

  return (
    <SidebarProvider>
        <div className="flex h-screen w-full">
            <AppSidebar />
            <SidebarInset className="overflow-x-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto bg-muted/40">
                {children}
              </main>
            </SidebarInset>
          </div>
        <Toaster />
    </SidebarProvider>
  );
}
