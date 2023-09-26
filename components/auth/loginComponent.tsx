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
      </CardContent>
    </Card>
  );
}
