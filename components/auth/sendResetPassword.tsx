"use client";

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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SendHorizontal } from "lucide-react";

type AuthResult = {
  success: boolean;
  error?: string;
};

export function SendResetPasswordEmail() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  //
  const handleSendResetPasswordEmail = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = {
      email: e.currentTarget.email.value,
    };
    try {
      console.log("Reset password email sent to:", formData.email);

      const { data, error } = await supabase.auth.resetPasswordForEmail(
        formData.email,
        {
          redirectTo: `${window.location.origin}/password/reset`,
        }
      );

      const message = "Password reset email sent. Please check your inbox.";

      router.push(`/password/send-reset-email?message=${message}`);

      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Password reset email sent", data);
      }
    } catch (err: any) {
      console.error("Error:", err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Password Reset Email</CardTitle>

        <CardDescription>
          Enter your email to receive password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSendResetPasswordEmail} method="post">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Your login email"
                type="email"
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-8 items-center">
            <Button type="submit" className="flex gap-2">
              Send
              <SendHorizontal size={20} />
            </Button>
          </div>
          <Messages />
        </form>
      </CardContent>
    </Card>
  );
}
