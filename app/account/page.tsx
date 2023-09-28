import { Profile } from "@/components/profile/profileComponent";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Account() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log("User not retrieved, redirecting to login");
    redirect("/login");
  }

  return (
    <main className="flex flex-col gap-8 px-8 sm:px-12 pt-6 md:py-10">
      <section className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
          Welcome to your profile page!
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          You can edit your profile here.
        </p>
      </section>
      <section className="flex gap-4 w-full">
        <Profile />
      </section>
    </main>
  );
}
