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

type AuthResult = {
  success: boolean;
  error?: string;
};

export function ResetPassword() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Your Password</CardTitle>

        <CardDescription>Add a new password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="/auth/reset-password" method="post">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
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
      </CardContent>
      {/* <CardFooter> */}
      {/* {authError && <div className="text-red-500">{authError}</div>} */}
      {/* </CardFooter> */}
      {/* <div className="text-gray-400 p-4">tim.coleman@hyperreal.io</div> */}
    </Card>
  );
}
