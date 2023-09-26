"use client";

import { useEffect } from "react";
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export function ResetPassword() {
  const supabase = createClientComponentClient();
  const params = useSearchParams();
  const code = params.get("code") || "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Your Password</CardTitle>
        {/* <div>code: {code}</div> */}
        <CardDescription>Add a new password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="/auth/reset-password" method="post">
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
