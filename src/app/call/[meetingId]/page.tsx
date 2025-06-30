interface Props {
    params: Promise<{
        meetingId: string 
    }>
}

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import React, { Suspense } from 'react'
import { dehydrate, HydrationBoundary, useQueryClient } from '@tanstack/react-query'
import { getQueryClient, trpc } from '@/trpc/server'
import { ErrorBoundary } from 'react-error-boundary'
import CallView from '@/modules/call/views/call-view'

const Page = async({ params }: Props) => {
    const session = auth.api.getSession({
        headers: await headers()
    }) 

    if (!session) redirect('/sign-in')

    const { meetingId } = await params;
    
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    )


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     {/* <Suspense>
        <ErrorBoundary>

        </ErrorBoundary>
     </Suspense> */}
     <CallView meetingId={meetingId} />
    </HydrationBoundary>
  )
}

export default Page
