import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);

  const body = await request.json();
  const { email, password } = body;
  const badEmail = "bademail@gml.com";
  // const email = badEmail;

  const supabase = createRouteHandlerClient({ cookies });

  console.log("email:", email, "password:", password);

  // const { error } = await supabase.auth.signInWithPassword({
  //   email,
  //   password,
  // });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    // options: {
    //   queryParams: {
    //     access_type: "offline",
    //     prompt: "consent",
    //   },
    // },
  });

  console.log("error:", error);

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  // console.log("redirecting to:", `${requestUrl.origin}`);

  // return NextResponse.redirect(requestUrl.origin, {
  //   // a 301 status is required to redirect from a POST to a GET route
  //   status: 301,
  // });
}
