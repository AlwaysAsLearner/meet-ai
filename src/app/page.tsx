"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const onSignOut = async () => {
    await authClient.signOut();
  };

  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return <div className="h-[100vh] w-[100vh] mx-auto flex items-center justify-center ">
      <span className="text-3xl text-center px-4">Loading...</span>
    </div>;
  }
   else if (session) {
    return (
      <div>
        <p className="text-2xl font-semibold">
          You are already registered {session.user.name}
        </p>
        <Button variant="destructive" onClick={onSignOut}>
          Sign out
        </Button>
      </div>
    );
  }
   else {
    return (redirect('/sign-in'));
  }
}
