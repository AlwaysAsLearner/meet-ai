"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { QueryClient, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import MeetingIdViewHeader from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "../../hooks/use-confirm";
import UpdateMeetingDialog from "../components/update-meeting-dialog";

interface Props {
  meetingId: string;
}

const MeetindIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  const router = useRouter()
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false)
  const queryClient = useQueryClient()
  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
        onSuccess: () => {
          queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
          router.push('/meetings')
        },
        onError: () => {}
    })
  )

  const handleRemoveMeeting = async() => {
    const ok = await confirmRemove();

    if(!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId })
  }

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    'Are you sure',
    'The following action will remove this meeting'
  )
  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog 
       open={updateMeetingDialogOpen}
       onOpenChange={setUpdateMeetingDialogOpen}
       initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader meetingName={data.name} meetingId={meetingId} 
         onRemove={handleRemoveMeeting} onEdit={() => setUpdateMeetingDialogOpen(true)}
        />
      </div>
    </>
  );
};

export default MeetindIdView;

export const MeetingsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting data"
      description="This may take few seconds..."
    />
  );
};

export const MeetingsIdError = () => {
  return (
    <ErrorState
      title="Error loading meeting information"
      description="Please Try again later"
    />
  );
};
