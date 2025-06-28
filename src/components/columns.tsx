"use client";

import { AgentGetOne } from "@/modules/agents/types";
import { ColumnDef } from "@tanstack/react-table";
import { GenerateAvatar } from "./generated-avatar";
import { CornerRightDownIcon, VideoIcon } from "lucide-react";
import { Badge } from "./ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1.5">
        <div className="flex items-center gap-x-2">
          <GenerateAvatar
            seed={row.original.name}
            variant="botttsNeutral"
            className="size-6"
          />
          <span className="font-semibold capitalize">{row.original.name}</span>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-2">
            <CornerRightDownIcon className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground max-w-[200px] capitalize truncate">
              {row.original.instructions}
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingsCount",
    header: "Meetings",
    cell: ({ row }) => {
      const meetingsCount = 5
      return(
      <Badge
        variant="outline"
        className="flex items-center gap-x-2 [&>svg]:size-4"
      >
        <VideoIcon className="text-blue-700" />
        {meetingsCount}{" "}
        {meetingsCount == 0
          ? "No meetings"
          : meetingsCount == 1
          ? "Meeting"
          : "Meetings"}
      </Badge>
    )},
  },
];
