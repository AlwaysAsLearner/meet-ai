"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { FormInput, OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

const SignInView = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const formData = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    authClient.signIn.email({
      email: data.email,
      password: data.password 
    },{
      onSuccess: () => router.push('/'),
      onError: ({ error }) => setError(error.message)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-0 border-0 rounded-lg">
        <CardContent className="p-0 grid md:grid-cols-2">
          <Form {...formData}>
            <form onSubmit={formData.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back!</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
                </div>

                <div className="grid gap-5">
                  <FormField
                    control={formData.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formData.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!!error && (
                    <Alert className="bg-destructive/10 border-none py-2">
                      <OctagonAlertIcon className="w-4 h-4 text-destructive" />
                      <AlertTitle className="text-sm text-red-600/80">{error}</AlertTitle>
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    className="bg-[#18b656] text-md text-white hover:bg-[#18b656]/80"
                  >
                    Login
                  </Button>
                  <div className="text-center text-sm relative after:border-border after:border-t after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center">
                    <span className="px-2 bg-card text-muted-foreground z-10">
                      Or continue with
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button" className="w-full">
                      Google
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      Github
                    </Button>
                  </div>

                  <div className="text-center text-sm">
                    Dont&apos;t have an account?{" "}
                    <Link href='/sign-up' className="text-muted-foreground hover:underline hover:underline-offset-4 hover:text-blue-500">Sign up</Link>
                  </div>
                </div>
              </div>
            </form>
          </Form>

          <div className="bg-radial from-green-600 to-green-800/80 rounded-r-lg relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.svg" alt="Image" className="w-[92px] h-[92px]" />
            <p className="text-white text-2xl font-semibold">Meet AI</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary *:[a]:cursor-pointer text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you aggre with our {" "} 
        <a href='#'>Terms of Service</a>{" "}and{" "} 
        <a href="#">Privacy Policy</a>          
      </div>
    </div>
  );
};

/*   fill="#32b686"  fill="#66e7b1"  */
export default SignInView;
