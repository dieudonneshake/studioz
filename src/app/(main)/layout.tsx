"use client";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // This is a simple guard.
    // In a real app, you might want to redirect to a specific login page
    // if the user tries to access a protected route.
    if (!isAuthenticated) {
      // Allow access to home for guests, but protect other main routes
      if (window.location.pathname !== '/home' && window.location.pathname !== '/browse' && !window.location.pathname.startsWith('/watch')) {
         router.push('/login');
      }
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
}
