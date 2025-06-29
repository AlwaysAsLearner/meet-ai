"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import NewMeetingDialog from "./new-meeting-dialog";
import { SearchFilter } from "./meeting-search-filter";
import StatusFilter from "./meeting-status-filter";
import AgentIdFilter from "./meeting-agent-id-filter";
import { useMeetingsFilters } from "../../hooks/use-meeting-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const ListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useMeetingsFilters();

  const isAnyFiltersModified =
    !!filters.search || !!filters.agentId || !!filters.status;

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: 1,
    });
  };

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex-col gap-y-8">
        <div className="flex items-center justify-between">
          <h5>My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <SearchFilter />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFiltersModified && (
              <Button variant="outline" onClick={onClearFilters}>
                <XCircleIcon className="size-4" />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default ListHeader;
