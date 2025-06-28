"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import AgentIdViewHeader from "./components/agent-id-view-header";
import { GenerateAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "../hooks/use-confirm";
import { useState } from "react";
import UpdateAgentDialog from "./components/update-agent-dialog";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  const router = useRouter();
  const queryClient = useQueryClient();
  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure",
    `The following action will remove ${data.meetingsCount} associated meetings`
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeAgent.mutateAsync({ id: agentId });
  };

  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false)

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
       open={updateAgentDialogOpen}
       onOpenChange={setUpdateAgentDialogOpen}
       initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onRemove={handleRemoveAgent}
          onEdit={() => setUpdateAgentDialogOpen(true)}
        />
        <div className="bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex flex-col cols-span-5">
            <div className="flex items-center gap-x-2">
              <GenerateAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="size-10"
              />
              <h2 className="text-2xl font-medium">{data.name}</h2>
            </div>

            <Badge
              variant="outline"
              className="flex items-center gap-x-2 [&>svg]:size-4"
            >
              <VideoIcon className="text-blue-600/70" />
              {data.meetingsCount}{" "}
              {data.meetingsCount === 1 ? "meeting" : "meetings"}
            </Badge>

            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Instructions</p>
              <p className="text-neutral-600">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentsIdViewLoadingState = () => {
  return (
    <LoadingState
      title="Loading Agent Info"
      description="This may take few seconds..."
    />
  );
};

export const AgentsIdViewErrorState = () => {
  return (
    <ErrorState
      title="Error loading Agent Info"
      description="Try refreshing the page"
    />
  );
};
