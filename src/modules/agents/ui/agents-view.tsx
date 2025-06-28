"use client";

import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import EmptyState from "@/components/empty-state";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions()); // using suspensQuery instead of normal query
  return (
    <div className="flex-1 px-4 md:px-8 pb-4 flex flex-col gap-y-4">
      <DataTable columns={columns} data={[]} />
      {[].length == 0 && (
        <EmptyState 
         title="Create your first Agent"
         description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take few seconds..."
    />
  );
};
