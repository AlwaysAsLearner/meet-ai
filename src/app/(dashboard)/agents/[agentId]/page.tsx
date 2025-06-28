interface Props {
    params: Promise<{ agentId: string }>
}

import { AgentIdView, AgentsIdViewErrorState, AgentsIdViewLoadingState } from '@/modules/agents/ui/agent-id-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const Page = async({ params }: Props) => {
    const { agentId } = await params

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({ id: agentId })
    )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsIdViewLoadingState />}>
        <ErrorBoundary fallback={<AgentsIdViewErrorState />}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
