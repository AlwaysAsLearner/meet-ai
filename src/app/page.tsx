"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async() => {
    await authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("User registered succesfully");
        },
      }
    );
  };

  const onLogin = async() => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("User not found");
        },
        onSuccess: () => {
          window.alert("Logged in succesfully");
        },
      }
    );
  };

  const onSignOut = async() => {
    await authClient.signOut()
  }

  const { data: session } = authClient.useSession();

  if (session) {
    return (
      <div>
        <p className="text-2xl font-semibold">You are already registered {session.user.name}</p>
        <Button variant='destructive' onClick={onSignOut}>Sign out</Button>
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col gap-y-7">
        <div className="flex flex-col p-4 gap-y-4">
        <Input
          name="name"
          placeholder="john"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          name="email"
          type="email"
          placeholder="john@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          placeholder="***"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit} type="submit">
          Create User
        </Button>
      </div>

      <div className="flex flex-col p-4 gap-y-4">
        <Input
          name="email"
          type="email"
          placeholder="john@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          placeholder="***"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin} type="submit">
          Login
        </Button>
      </div>
      </div>
    );
  }
}
