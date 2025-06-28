'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import NewAgentDialog from './agent-dialog'
import { useAgentFilters } from '../../hooks/use-agent-filters'
import { SearchFilter } from './agents-search-filter'
import { DEFAULT_PAGE } from '@/constants'

const ListHeader = () => {
  const [isOpen, setIsOpen] = useState(false);  
 
  const [filters, setFilters] = useAgentFilters()

  const isAnyFilterModified = !!filters.search

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE
    })
  }
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
      <div className='flex items-center gap-x-2 p-1'>
        <SearchFilter />
        {isAnyFilterModified && (
          <Button className='flex items-center gap-x-3 py-2' variant='outline' size='sm' onClick={onClearFilters}>
            <XCircleIcon className='size-4 text-red-500/60' />
            Clear
          </Button>
        )}
      </div>
    </div>
    </>
  )
}

export default ListHeader
