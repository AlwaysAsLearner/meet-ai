'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import NewMeetingDialog from './new-meeting-dialog'

const ListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)   
  return (
    <>
     <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
     <div className="py-4 px-4 md:px-8 flex-col gap-y-8">
      <div className='flex items-center justify-between'>
        <h5>My Meetings</h5>
        <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Meeting
        </Button>
      </div>
      <div className='flex items-center gap-x-2 p-1'>
       Todo filterss
      </div>
    </div>
    </>
  )
}

export default ListHeader
