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

export function SignUp() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>

        <CardDescription>Use your email and password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="/auth/sign-up" method="post">
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
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-8 items-center">
            <Button formAction="/auth/sign-up" type="submit">
              Create
            </Button>

            <div className="text-sm text-muted-foreground">
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
