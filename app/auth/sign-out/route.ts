import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  console.log("sign-out/route.ts: POST");
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient({ cookies });

  await supabase.auth.signOut();

  console.log("sign-out/route.ts: requestUrl.origin", requestUrl.origin);

  // return NextResponse.redirect(`${requestUrl.origin}/login`, {
  //   // a 301 status is required to redirect from a POST to a GET route
  //   status: 301,
  // });
  // Return a success status.
  return new Response("Logged out successfully", { status: 200 });
}
