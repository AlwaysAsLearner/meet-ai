"use client";

import { DataTable } from "@/components/data-table";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { MeetingGetMany } from "../../types";
import { columns } from "../components/columns";
import EmptyState from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meeting-filters";
import DataPagination from "@/components/data-pagination";

const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter()
  const [filters, setFilters] = useMeetingsFilters()
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({...filters}));
  return (
    <div className="overflow-x-scroll px-4 py-4 md:px-8">
      <DataTable data={data.items} columns={columns} onRowClick={(row) => router.push(`/meetings/${row.id}`)} />
      <DataPagination 
       page={filters.page}
       totalPages={data.totalPages}
       onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && <EmptyState
       title="Create your first Meeting"
       description="Create an agent to join your meeting, Each agent will follow your instructions
       and can interact with participants during the real time."
      />}
    </div>
  );
};

export default MeetingsView;

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take few seconds..."
    />
  );
};

export const MeetingsViewErrorState = () => {
  return (
    <ErrorState
      title="Error loading meetings"
      description="Please try again later"
    />
  );
};
