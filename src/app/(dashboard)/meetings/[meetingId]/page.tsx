interface Props {
    params: Promise<{ meetingId: string }>
}

import { AgentIdView, AgentsIdViewErrorState, AgentsIdViewLoadingState } from '@/modules/agents/ui/agent-id-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const Page = async({ params }: Props) => {
    const { meetingId } = await params

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    )
  return (
    <div>
      {meetingId}
    </div>
  )
}

export default Page
