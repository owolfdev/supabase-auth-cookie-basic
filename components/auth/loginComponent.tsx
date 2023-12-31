"use client";

import { use, useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Messages from "./messages";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import { BsGoogle } from "react-icons/bs";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function LogIn() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoggingIn(true);
  };
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("event", event, "session", session);
      }
    );
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogInWithGoogle = async () => {
    // setIsLoggingIn(true);
    // const response = await fetch("/auth/google", {
    //   method: "POST",
    // });
    router.push("/login-google");
  };

  return (
    <Card>
      {isLoggingIn && (
        <div className="absolute w-[320px] h-[300px] sm:w-[450px] sm:h-[400px] z-20">
          <div className="fixed h-full w-full bg-black opacity-50 z-0 top-0 right-0"></div>
          <div className="flex justify-center align-middle items-center h-full w-full">
            <Loader2 className="w-20 h-20 animate-spin z-10" />
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle>Please Log In</CardTitle>
        <CardDescription>Use your email and password.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          <form onSubmit={handleSubmit} action="/auth/sign-in" method="post">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Your email"
                  type="email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Your password"
                  type="password"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-row justify-between gap-4 pt-8 items-center">
                <Button type="submit">Log In</Button>

                <div className="text-sm text-muted-foreground hidden sm:block">
                  Dont have an account?
                </div>
                <Link
                  href="/signup"
                  className={buttonVariants({
                    variant: "outline",
                  })}
                >
                  Sign Up
                </Link>
              </div>
              <Link
                href="/password/send-reset-email"
                className="text-sm text-muted-foreground hover:cursor-pointer"
              >
                Forgot your password?
              </Link>
            </div>
            <Messages />
          </form>
          <div>
            {/* google */}
            {/* <Button onClick={handleLogInWithGoogle}>
              <span className="flex gap-2 items-center">
                <span>Sign In with Google</span>
                <BsGoogle />
              </span>
            </Button> */}
            {/* <Button onClick={handleLogInWithGoogle}>
              <span className="flex gap-2 items-center">
                <span>Sign In with Google</span>
                <BsGoogle />
              </span>
            </Button> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
