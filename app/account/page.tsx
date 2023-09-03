import React from "react";
import Link from "next/link";
import { ProfileForm } from "@/components/profileForm";

function Account() {
  return (
    <main className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <section className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
          Welcome to your account page!
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          This is your account page. You can edit your profile here.
        </p>
      </section>
      <section className="flex gap-4 w-full">
        <ProfileForm />
      </section>
    </main>
  );
}

export default Account;
