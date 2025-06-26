"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import DashboardUserButton from "./dashboard-user-button";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Mettings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link
          href="/"
          className="flex items-center justify-between gap-2 px-2 pt-2"
        >
          <Image src="/logo.svg" width={60} height={80} alt="Meet AI logo" />
          <p className="text-2xl font-[550] mr-4">Meet AI</p>
        </Link>
      </SidebarHeader>

      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5D6868]" />
      </div>

      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {firstSection.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  className={cn(
                    "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                    pathname === item.href &&
                      "bg-linear-to-4/oklch border-[#5d6b68]/10 bg-linear-to-r/oklch from-sidebar-accent from-5% via-50% via-sidebar/70 to-sidebar/70"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="size-5" />
                    <span className="text-sm font-medium tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5D6868]" />
      </div>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {secondSection.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  className={cn(
                    "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                    pathname === item.href &&
                      "bg-linear-to-4/oklch border-[#5d6b68]/10 bg-linear-to-r/oklch from-sidebar-accent from-5% via-50% via-sidebar/70 to-sidebar/70"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="size-5" />
                    <span className="text-sm font-medium tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarFooter>
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
