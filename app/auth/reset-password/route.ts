import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password"));
  const requestUrl = new URL(request.url);

  const supabase = createRouteHandlerClient({ cookies });

  supabase.auth.updateUser({
    password,
  });

  return NextResponse.redirect(`${requestUrl.origin}`, {
    status: 301,
  });
}
