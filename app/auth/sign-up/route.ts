import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  console.log("sign up route");

  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const confirmPassword = String(formData.get("confirm-password"));
  const supabase = createRouteHandlerClient({ cookies });

  console.log("email", email);

  if (password !== confirmPassword) {
    return NextResponse.redirect(
      `${requestUrl.origin}/signup?error=Passwords do not match`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not sing up new user ${error.message}`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  // console.log("email", email);
  // console.log("password", password);
  // console.log("confirmPassword", confirmPassword);

  return NextResponse.redirect(
    `${requestUrl.origin}/signup?message=Check email to continue sign in process`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
