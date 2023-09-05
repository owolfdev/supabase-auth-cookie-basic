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
import Link from "next/link";

import GoToSignupButton from "./goToSignupButton";

type AuthResult = {
  success: boolean;
  error?: string;
};

const handleResetPassword = () => {
  console.log("Reset password");
};

export function LogIn() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Please Log In</CardTitle>

        <CardDescription>Use your email and password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="/auth/sign-in" method="post">
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
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-8 items-center">
              <Button type="submit">Log In</Button>

              <div className="text-sm ">Don't have an account?</div>
              <GoToSignupButton />
            </div>
            <Link
              href="/send-reset-password-email"
              className="text-sm text-muted-foreground hover:cursor-pointer"
            >
              Forgot your password?
            </Link>
          </div>

          <Messages />
        </form>
      </CardContent>
      {/* <CardFooter> */}
      {/* {authError && <div className="text-red-500">{authError}</div>} */}
      {/* </CardFooter> */}
      {/* <div className="text-gray-400 p-4">tim.coleman@hyperreal.io</div> */}
    </Card>
  );
}
