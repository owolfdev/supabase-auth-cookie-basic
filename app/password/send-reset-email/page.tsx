import { SendResetPasswordEmail } from "@/components/auth/sendResetPassword";

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage() {
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
