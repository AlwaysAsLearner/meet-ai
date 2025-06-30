import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CallEnded = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      {" "}
      {/* background and main wrapper */}
      <div className="py-4 px-4 flex flex-1 items-center justify-center">
        {" "}
        {/* Padding and centering div */}
        <div className="flex flex-col items-center justify-center gap-y-6 bg-radial bg-background rounded-lg p-10 shadow-sm">
          {" "}
          {/* Main content div */}
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">You have ended the call</h6>
            <p className="text-sm">Summary will appear in few minutes</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/meetings">Back to Meetings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
