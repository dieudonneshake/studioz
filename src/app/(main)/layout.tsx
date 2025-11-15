import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  // TODO: Add check for authentication. If not authenticated, redirect to /login
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 overflow-y-auto">
              {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
