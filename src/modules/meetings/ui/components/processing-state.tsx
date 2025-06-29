import React from 'react'

import EmptyState from '@/components/empty-state'

interface Props {
 
}

const ProcessingState = ({  }: Props) => {
  return(
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
       image='/processing.svg'
       title='Meeting Completed'
       description='Meeting summary will be created in few seconds'
      />
    </div>
  )
}

export default ProcessingState


