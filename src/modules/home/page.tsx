"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Loader } from "lucide-react";

export default function HomeView() {  
  const onSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => redirect("/sign-in"),
      },
    });
  };

  //const { data: session, isPending } = authClient.useSession();
  return (
    <div>
      <p className="text-2xl font-semibold">Welcome </p>
      <Button variant="destructive" onClick={onSignOut}>
        Sign out
      </Button>
    </div>
  );
}
