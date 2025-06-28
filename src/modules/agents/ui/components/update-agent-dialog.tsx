import ResponsiveDialog from '@/components/responsive-dialog'
import React from 'react'
import NewAgentForm from './agent-form'
import AgentForm from './agent-form'
import { AgentGetOne } from '../../types'

interface NewAgentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    initialValues: AgentGetOne
}

const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog
     title='Edit Agent'
     description='Edit the agent details'
     open={open}
     onOpenChange={onOpenChange} 
    >
      <AgentForm
       initialValues={initialValues}
       onSuccess={() => onOpenChange(false)}
       onCancel={() => onOpenChange(false)}
      />

    </ResponsiveDialog>
  )
}

export default UpdateAgentDialog
