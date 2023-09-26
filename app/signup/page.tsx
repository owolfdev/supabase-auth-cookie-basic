"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignUp } from "@/components/auth/signupComponent";
// import supabase from "@/lib/supabaseClient";
// import useUser from "@/hooks/useUser";

export const dynamic = "force-dynamic";

export default function SignInPage() {
  const [theme, setTheme] = useState("");
  // const [user, setUser] = useState({});
  const [error, setError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [notionData, setNotionData] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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

  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();

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
    <section className="container flex flex-col items-center justify-center gap-6 pt-12">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-center w-full font-extrabold leading-tight tracking-tight text-5xl">
          Sign Up
        </h1>
      </div>
      <div className="w-full sm:w-[460px]">
        {/* <div>{JSON.stringify(user)}</div> */}
        <SignUp
        // supabase={supabase}
        // signin={handleLogin}
        // signup={handleSignUp}
        />
      </div>
    </section>
  );
}
