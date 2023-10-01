"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { useSearchParams } from "next/navigation";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

import { MoveLeft } from "lucide-react";
import { Loader2 } from "lucide-react";

export function ResetPassword() {
  // const supabase = createClientComponentClient();
  const params = useSearchParams();
  const code = params.get("code") || "";

  const [isResetting, setIsResetting] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsResetting(true);
  };

  return (
    <Card>
      {isResetting && (
        <div className="absolute w-[320px] h-[250px] sm:w-[450px] sm:h-[300px] z-20">
          <div className="fixed h-full w-full bg-black opacity-50 z-0 top-0 right-0"></div>
          <div className="flex justify-center align-middle items-center h-full w-full">
            <Loader2 className="w-20 h-20 animate-spin z-10" />
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle>Reset Your Password</CardTitle>
        <CardDescription>Add a new password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          action="/auth/reset-password"
          method="post"
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <input type="hidden" name="code" value={code} />
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Your new password"
                type="password"
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-8 items-center">
            <Button type="submit">Reset</Button>
          </div>
          <Messages />
        </form>
        <div className="pt-4">
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:cursor-pointer "
          >
            <div className="flex gap-2 items-center">
              <MoveLeft />
              <span>Back to Log In</span>
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
