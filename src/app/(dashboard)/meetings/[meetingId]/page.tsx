interface Props {
  params: Promise<{ meetingId: string }>;
}

import { auth } from "@/lib/auth";
import {
  AgentIdView,
  AgentsIdViewErrorState,
  AgentsIdViewLoadingState,
} from "@/modules/agents/ui/agent-id-view";
import MeetindIdView, { MeetingsIdError, MeetingsIdViewLoading } from "@/modules/meetings/ui/views/meeting-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";


const Page = async ({ params }: Props) => {
  const { meetingId } = await params;

    const session = await auth.api.getSession({
      headers: await headers()
    })
  
    if (!session) redirect('/sign-in')

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsIdViewLoading />}>
        <ErrorBoundary fallback={<MeetingsIdError />}>
           <MeetindIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
