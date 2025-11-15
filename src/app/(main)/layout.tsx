import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  // TODO: Add check for authentication. If not authenticated, redirect to /login
  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <SidebarInset>
              {children}
            </SidebarInset>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
