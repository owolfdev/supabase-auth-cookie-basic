"use client";

import { useState } from "react";
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
import { SendHorizontal, MoveLeft } from "lucide-react";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

import { Loader2 } from "lucide-react";

import Link from "next/link";
// import { set } from "react-hook-form";

type AuthResult = {
  success: boolean;
  error?: string;
};

export function SendResetPasswordEmail() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  //
  const handleSendResetPasswordEmail = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSending(true);

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

      if (error) {
        console.log("Error:", error);
        const message = "Error sending password update email.";
        router.push(`/password/send-reset-email?message=${message} ${error}.`);
        toast({
          title: "Error sending password update email.",
          description: `${error}.`,
        });
        setIsSending(false);
      } else {
        console.log("Password reset email sent", data);
        const message = "Password reset email sent. Please check your inbox.";
        router.push(`/password/send-reset-email?message=${message}`);
        toast({
          title: "Password reset email sent.",
          description: "Please check your inbox.",
        });
        setIsSending(false);
      }
    } catch (err: any) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <Card>
        {isSending && (
          <div className="absolute w-[320px] h-[250px] sm:w-[450px] sm:h-[300px] z-20">
            <div className="fixed h-full w-full bg-black opacity-50 z-0 top-0 right-0"></div>
            <div className="flex justify-center align-middle items-center h-full w-full">
              <Loader2 className="w-20 h-20 animate-spin z-10" />
            </div>
          </div>
        )}
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
        {/* <div className="bg-pink-500 absolute h-full w-full">
          <div className="absolute h-full w-full  bg-black opacity-50 z-0"></div>
          <div className="flex justify-center align-middle items-center h-full pb-60 ">
            <Loader2 className="w-20 h-20 animate-spin z-10" />
          </div>
        </div> */}
      </Card>

      <Toaster />
    </>
  );
}
