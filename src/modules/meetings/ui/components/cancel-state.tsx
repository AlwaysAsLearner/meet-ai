import React from 'react'

import EmptyState from '@/components/empty-state'

interface Props {
 
}

const CancelState = ({  }: Props) => {
  return(
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
       image='/upcoming.svg'
       title='Meeting is active'
       description='Meeting will end once all participants have left'
      />
    </div>
  )
}

export default CancelState


