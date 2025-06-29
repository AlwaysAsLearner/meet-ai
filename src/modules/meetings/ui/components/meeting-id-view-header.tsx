import React from 'react'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { ChevronRightIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface Props {
    meetingId: string,
    meetingName: string,
    onEdit?: () => void,
    onRemove?: () => void
}
const MeetingIdViewHeader = ({ meetingId, meetingName, onEdit, onRemove }: Props) => {
  return (
    <div className='flex items-center justify-between'>
      <Breadcrumb>
       <BreadcrumbList>
        <BreadcrumbItem>
         <BreadcrumbLink asChild className='font-medium text-xl'>
           <Link href="/meetings">
            My Meetings
           </Link>
         </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator className='[&>svg]:size-4 text-foreground text-xl font-medium'>
          <ChevronRightIcon />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
         <BreadcrumbLink asChild className='font-medium text-xl text-foreground'>
           <Link href={`/meetings/${meetingId}`}>
            {meetingName}
           </Link>
         </BreadcrumbLink>
        </BreadcrumbItem>
       </BreadcrumbList>
      </Breadcrumb>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={onEdit}>
                <PencilIcon className='size-4 text-blue-500/60' />
                Edit 
            </DropdownMenuItem>

            <DropdownMenuItem onClick={onRemove}>
                <TrashIcon className='size-4 text-red-500/60' />
                Remove
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default MeetingIdViewHeader
