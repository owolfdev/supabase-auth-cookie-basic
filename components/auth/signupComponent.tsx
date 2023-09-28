"use client";
import { useState } from "react";

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
import { Button, buttonVariants } from "@/components/ui/button";

import { Loader2 } from "lucide-react";

export function SignUp() {
  const [isSigningUp, setSigningUp] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSigningUp(true);
  };

  return (
    <Card>
      {isSigningUp && (
        <div className="absolute w-[320px] h-[300px] sm:w-[450px] sm:h-[400px] z-20">
          <div className="fixed h-full w-full bg-black opacity-50 z-0 top-0 right-0"></div>
          <div className="flex justify-center align-middle items-center h-full w-full">
            <Loader2 className="w-20 h-20 animate-spin z-10" />
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle>Create an account</CardTitle>

        <CardDescription>Use your email and password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} action="/auth/sign-up" method="post">
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm your password"
                type="password"
                required
              />
            </div>
          </div>
          <div className="flex  justify-between gap-4 pt-8 items-center">
            <Button formAction="/auth/sign-up" type="submit">
              Create
            </Button>

            <div className="text-sm text-muted-foreground hidden sm:block">
              Already have an account?
            </div>
            <Link
              href="/login"
              className={buttonVariants({
                variant: "outline",
                size: "default",
              })}
            >
              Login
            </Link>
          </div>
          <Messages />
        </form>
      </CardContent>
    </Card>
  );
}
