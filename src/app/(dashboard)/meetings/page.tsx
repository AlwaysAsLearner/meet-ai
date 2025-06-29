import { AgentsViewLoading } from '@/modules/agents/ui/agents-view'
import MeetingsView, { MeetingsViewErrorState, MeetingsViewLoading } from '@/modules/meetings/ui/views/meetingsView'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const Page = () => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({})
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewLoading />}>
        <ErrorBoundary fallback={<MeetingsViewErrorState />}>
          <MeetingsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
