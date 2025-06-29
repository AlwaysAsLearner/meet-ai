import ResponsiveDialog from '@/components/responsive-dialog'
import React from 'react'
import MeetingForm from './meeting-form'
import { useRouter } from 'next/navigation'
// import NewAgentForm from './agent-form'
// import AgentForm from './agent-form'

interface NewAgentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void 
}

const NewMeetingDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
    const router = useRouter()
  return (
    <ResponsiveDialog
     title='New Meeting'
     description='Create a new meeting'
     open={open}
     onOpenChange={onOpenChange} 
    >
     <MeetingForm 
      onSuccess={(id: string) => {
        onOpenChange(false)
        router.push(`/meetings/${id}`)
      }}
     />
    </ResponsiveDialog>
  )
}

export default NewMeetingDialog
