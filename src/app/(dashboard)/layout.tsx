import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col w-screen h-screen bg-muted-foreground">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
