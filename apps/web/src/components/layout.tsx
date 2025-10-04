import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '14rem',
          '--sidebar-width-mobile': '20rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <main className="p-6">{children}</main>
    </SidebarProvider>
  );
}
