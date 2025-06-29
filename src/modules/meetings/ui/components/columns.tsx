"use client";

import { AgentGetOne } from "@/modules/agents/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowDown,
  ClockFading,
  CornerRightDownIcon,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";
import { MeetingGetMany } from "../../types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { cn } from "@/lib/utils";
import humanizeDuration from "humanize-duration";
import { format } from "date-fns";
import { GenerateAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "w", "s"],
  });
}

const statusIconMap = {
  upcoming: ClockArrowDown,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow/20 text-yellow-800 border-yellow-800/5",
  active: "bg-blue/20 text-blue-800 border-blue-800/5",
  completed: "bg-emarald/20 text-emarald-800 border-emarald-800/5",
  cancelled: "bg-rose/20 text-rose-800 border-rose-800/5",
  processing: "bg-gray/20 text-gray-800 border-gray-800/5",
};
export const columns: ColumnDef<MeetingGetMany[number]> = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1 px-2 pt-2">
        <span className="font-semibold capitalize">{row.original.name}</span>

        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerRightDownIcon className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground max-w-[200px] capitalize truncate">
              {row.original.agent.name}
            </span>
          </div>
          <GenerateAvatar
            variant="botttsNeutral"
            seed={row.original.agent.name}
            className="size-6"
          />
          <span className="text-sm text-muted-foreground">
            {row.original.startedAt
              ? format(row.original.startedAt, "MMM d")
              : ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];
      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize [&>svg]:size-4 text-muted-foreground",
            statusColorMap[row.original.status as keyof typeof statusColorMap]
          )}
        >
          <Icon
            className={cn(
              row.original.status === "processing" && "animate-spin"
            )}
          />
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      return (
        <>
          <Badge
            variant="outline"
            className="capitalize [&>svg]:size-4 text-muted-foreground"
          >
            <ClockFading className="text-blue-700" />
            {row.original.duration
              ? formatDuration(row.original.duration)
              : "No duration"}
          </Badge>
        </>
      );
    },
  },

];
