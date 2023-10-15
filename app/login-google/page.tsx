"use client";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const handleLogInWithGoogle = async () => {
    console.log("logging in with google");

    fetch("/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "oliverwolfson@gmail.com",
        password: "123456",
      }),
    }).then((response) => {
      if (response.redirected) {
        // window.location.href = response.url;
      } else {
        // Handle non-redirect responses
      }
    });
  };

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pt-12 ">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-center w-full font-extrabold leading-tight tracking-tight text-5xl">
          Log In
        </h1>
      </div>
      <div className="w-full sm:w-[460px]">
        <Button onClick={handleLogInWithGoogle}>Log in With Google</Button>
      </div>
    </section>
  );
}
