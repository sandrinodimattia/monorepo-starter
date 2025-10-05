import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { Calculator, Heart, Home, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Calculator',
    url: '/calculator',
    icon: Calculator,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
  {
    title: 'Health',
    url: '/health',
    icon: Heart,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-stone-100/80">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-[var(--color-sidebar-category)]">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'text-[13px] font-medium h-7 rounded-sm',
                      'text-[var(--color-sidebar-font)]',
                      'hover:text-[var(--color-sidebar-hover)] hover:bg-[var(--color-sidebar-selected-background)]',
                      'active:text-[var(--color-sidebar-selected)] active:bg-[var(--color-sidebar-selected-background)]'
                    )}
                  >
                    <Link
                      to={item.url}
                      activeProps={{
                        className:
                          'bg-[var(--color-sidebar-selected-background)] text-[var(--color-sidebar-selected)]',
                      }}
                      activeOptions={{ exact: true }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
