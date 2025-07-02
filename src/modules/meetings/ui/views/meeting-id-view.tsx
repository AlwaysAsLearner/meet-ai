"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  QueryClient,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import MeetingIdViewHeader from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "../../hooks/use-confirm";
import UpdateMeetingDialog from "../components/update-meeting-dialog";
import { UpcomingState } from "../components/upcoming-state";
import ActiveState from "../components/active-state";
import CancelState from "../components/cancel-state";
import ProcessingState from "../components/processing-state";
import CompletedState from "../components/completed-state";

interface Props {
  meetingId: string;
}

const MeetindIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  const router = useRouter();
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
      onError: () => {},
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure",
    "The following action will remove this meeting"
  );

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isProcessing = data.status === "processing";
  const isCompleted = data.status === "completed";
  const isCancelled = data.status === "cancelled";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingName={data.name}
          meetingId={meetingId}
          onRemove={handleRemoveMeeting}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
        />
        {isCancelled && <CancelState />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
        {isProcessing && <ProcessingState />}
        {isCompleted && <CompletedState data={data} />}
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
