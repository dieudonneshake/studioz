import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { GlobalLoader } from '@/components/global-loader';
import { Suspense } from 'react';
import { BottomNav } from '@/components/bottom-nav';


export const metadata: Metadata = {
  title: 'Ederaxy',
  description: 'A YouTube-like Global Educational Video Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=YouTube+Sans:wght@300..900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background font-sans")}>
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
        </SidebarProvider>
        <BottomNav />
        <Toaster />
        <Suspense>
          <GlobalLoader />
        </Suspense>
      </body>
    </html>
  );
}
