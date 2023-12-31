import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  // const { data: authListener } = supabase.auth.onAuthStateChange(
  //   async (event, session) => {
  //     console.log("event", event, "session", session);
  //   }
  // );
  // return () => {
  //   authListener?.subscription.unsubscribe();
  // };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // console.log("User not retrieved, redirecting to login");
    redirect("/login");
  }

  return (
    <main className="flex flex-col gap-8 px-8 sm:px-12 pt-6 md:py-10">
      <section className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
          Authentication App.
          {/* Supabase Auth Template with Next.js 13 */}
        </h1>
        <p className="max-w-[700px] text-lg text-foreground">
          Login / Signup successful! Welcome to Auth, {user?.email}!
          {/* A ready-to-use authentication template leveraging Supabase and Next.js
          13, styled with the Shadcn/ui component collection. */}
        </p>
        <p className="max-w-[700px] text-base text-muted-foreground">
          {/* In a Next.js 13 application with Supabase integration, utilizing
          cookie-based authentication is a secure and streamlined method for
          managing user sessions. */}
          Feel free to update your profile page by clicking the link in the
          navigation bar.
        </p>
      </section>
    </main>
  );
}
