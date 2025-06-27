import { AgentsView, AgentsViewLoading } from '@/modules/agents/ui/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AgentsErrorState from './error'

const Page = async() => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions()) // so much faster than client fetching
  return (
    <HydrationBoundary state={dehydrate(queryClient)}> {/* This is hydration boundary which will first dehydrate our query */}
        <Suspense fallback={<AgentsViewLoading />}> {/* Using suspense to handle loading state */}
            <ErrorBoundary fallback={<AgentsErrorState />}>
                <AgentsView />
            </ErrorBoundary>
        </Suspense>
    </HydrationBoundary>
  )
}

export default Page
