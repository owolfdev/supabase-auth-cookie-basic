"use client";

import React, { useState, useEffect } from "react";

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
import { useRouter } from "next/navigation";
// import { signIn, signUp } from "./authUtils";

type AuthResult = {
  success: boolean;
  error?: string; // Indicates error can be undefined.
};

export function LogIn({}: {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    console.log("handleSignin");
    // const result: AuthResult = await signIn(email, password);
    // if (!result.success) {
    //   setAuthError(result.error ?? null); // Use null if error is undefined.
    // } else {
    //   router.push("/");
    // }
  };

  const handleSignup = async () => {
    console.log("handleSignup");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(isSignUp);

    if (isSignUp) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isSignUp ? "Create an Account" : "Please Log In"}
        </CardTitle>

        <CardDescription>
          {isSignUp
            ? "Create your user account."
            : "Use your email and password."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Your email"
                onChange={(e) => {
                  setAuthError(null);
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Your password"
                onChange={(e) => {
                  setAuthError(null);
                  setPassword(e.target.value);
                }}
              />
            </div>
            {isSignUp && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  // Add appropriate state and handlers
                />
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-8 items-center">
            <Button type="submit">{isSignUp ? "Create" : "Log In"}</Button>

            <div>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </div>
            <Button
              className="px-3 py-0"
              variant="outline"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setAuthError(null);
              }}
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {authError && <div className="text-red-500">{authError}</div>}
      </CardFooter>
      {/* <div className="text-gray-400 p-4">tim.coleman@hyperreal.io</div> */}
    </Card>
  );
}
