import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "@/components/auth/loginComponent";
import { ResetPassword } from "@/components/auth/resetComponent";
import { SendResetPasswordEmail } from "@/components/auth/sendResetPassword";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Divide } from "lucide-react";
// import supabase from "@/lib/supabaseClient";
// import useUser from "@/hooks/useUser";

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage() {
  const supabase = createServerComponentClient({ cookies });
  // const { user } = useUser();

  // const handleSignIn = async (email: string, password: string) => {
  //   // setLoggingIn(true);
  //   const { error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) {
  //     // setLoggingIn(false);
  //     // setError(JSON.stringify(error));
  //     return;
  //   }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //   if (user) {
  //     // setUser(user as any);
  //     router.push("/");
  //   } else {
  //     console.log("User not retrieved");
  //   }
  // };

  // const handleSignup = async (email: string, password: string) => {
  //   // setLoggingIn(true); // assuming you want to use the same state for signing up

  //   const { error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //   });

  //   if (error) {
  //     // setLoggingIn(false);
  //     // setError(JSON.stringify(error));
  //     return;
  //   }

  //   if (user) {
  //     // setUser(user as any);
  //     router.push("/"); // redirect after sign-up, if needed
  //   } else {
  //     console.log("User not created");
  //   }
  // };

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pt-12 ">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-center w-full font-extrabold leading-tight tracking-tight text-5xl">
          Reset Password
        </h1>
      </div>
      <div className="w-full sm:w-[460px]">
        <SendResetPasswordEmail />
      </div>
    </section>
  );
}
