"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import DashboardCommand from "./dashboard-command";
import { useState } from "react";

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [ commandOpen, setCommandOpen ] = useState(false);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="px-4 py-3 gap-x-2 flex items-center bg-background border-b">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon />
          ) : (
            <PanelLeftCloseIcon />
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen((s) => !s)}
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
        >
          <SearchIcon />
          Search...
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
