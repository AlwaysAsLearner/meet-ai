import { auth } from "@/lib/auth";
import { AgentsViewLoading } from "@/modules/agents/ui/agents-view";
import ListHeader from "@/modules/meetings/ui/components/list-header";
import MeetingsView, {
  MeetingsViewErrorState,
  MeetingsViewLoading,
} from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <>
      <ListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
            <MeetingsView />
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
