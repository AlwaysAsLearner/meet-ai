'use client'

import ErrorState from '@/components/error-state'
import LoadingState from '@/components/loading-state'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'

const MeetingsView = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
  return (
   <div>
    {JSON.stringify(data, null, 2)}
   </div> 
  )
}

export default MeetingsView

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