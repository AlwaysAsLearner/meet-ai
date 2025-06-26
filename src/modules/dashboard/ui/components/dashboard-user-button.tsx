import { GenerateAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronRight, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter()
  const onLogOut = async() => {
    authClient.signOut({
        fetchOptions: {
            onSuccess: () => router.push('/sign-in')
        }
    })
  }

  if (isPending || !data?.user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-3">
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
            <GenerateAvatar 
                seed={data.user.name}
                variant="initials"
            />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full font-semibold">{data.user.name}</p>
            <p className="text-xs truncate w-full">{data.user.email}</p>
        </div>
        <ChevronRight className="w-4 h-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" side="right" className="w-72 bg-sidebar-primary text-sidebar-foreground border border-sidebar-primary ml-2">
        <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <span className="font-medium truncate">{data.user.name}</span>
              <span className="text-xs truncate text-muted-foreground">{data.user.email}</span>
            </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="opacity-10" />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent">
            Billing
            <CreditCardIcon />
        </DropdownMenuItem>
        <DropdownMenuItem  onClick={onLogOut} className="cursor-pointer flex items-center justify-center hover:bg-red-600 hover:text-stone-200">
            Logout
            <LogOutIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;
