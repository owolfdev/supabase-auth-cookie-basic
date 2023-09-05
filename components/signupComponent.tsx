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
import axios from "axios";

type AuthResult = {
  success: boolean;
  error?: string; // Indicates error can be undefined.
};

import GoToLoginButton from "./goToLoginButton";

export function SignUp() {
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formData = {
  //     email: e.currentTarget.email.value,
  //     password: e.currentTarget.password.value,
  //     confirmPassword: e.currentTarget["confirm-password"].value,
  //   };

  //   // Validate data using zod
  //   try {
  //     // const validData = SignUpSchema.parse(formData);

  //     // Now that validation is successful, perform the API call
  //     const response = await axios.post("/auth/signup", validData);

  //     if (response.data.success) {
  //       // Navigate user to the login page or wherever you want
  //       console.log("Registration successful");
  //     } else {
  //     }
  //   } catch (err: any) {
  //     // Handle validation errors from Zod or network errors

  //     console.error("Error:", err);
  //   }
  // };

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
                // onChange={(e) => {
                //   setAuthError(null);
                //   setEmail(e.target.value);
                // }}
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

            <div className="text-sm">Already have an account?</div>

            <GoToLoginButton />
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
