import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("User not retrieved, redirecting to login");
    redirect("/login");
  }

  return (
    <main className="flex flex-col gap-8 px-8 sm:px-12 pt-6 md:py-10">
      <section className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
          Supabase Auth Template with Next.js 13
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          A ready-to-use authentication template leveraging Supabase and Next.js
          13, styled with the Shadcn/ui component collection. Start building
          your secure app with ease!
        </p>
        <p className="max-w-[700px] text-base text-muted-foreground">
          In a Next.js 13 application with Supabase integration, cookie-based
          authentication offers a secure and streamlined method for managing
          user sessions. Unlike token-based mechanisms that require client-side
          storage, cookie-based authentication enables the server to maintain
          user state between requests.
        </p>
      </section>
    </main>
  );
}
