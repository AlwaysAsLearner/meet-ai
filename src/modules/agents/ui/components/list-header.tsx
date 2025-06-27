'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import NewAgentDialog from './agent-dialog'

const ListHeader = () => {
  const [isOpen, setIsOpen] = useState(false);  
  return (
    <>
     <NewAgentDialog open={isOpen} onOpenChange={setIsOpen} />
     <div className="py-4 px-4 md:px-8 flex-col gap-y-8">
      <div className='flex items-center justify-between'>
        <h5>My Agents</h5>
        <Button onClick={() => setIsOpen(true)}>
            <PlusIcon />
            New Agent
        </Button>
      </div>
    </div>
    </>
  )
}

export default ListHeader
