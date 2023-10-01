"use client";

import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/themeProvider";
import { SiteHeader } from "@/components/nav/siteHeader";
// import { createClient } from "@supabase/supabase-js";
// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const headersList = headers();
  // const pathname = headersList.get("x-invoke-path") || "";
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className="">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {pathname !== "/login" &&
            pathname !== "/send-reset-password-email" &&
            pathname !== "/signup" &&
            pathname !== "/password/reset" &&
            pathname !== "/password/send-reset-email" && <SiteHeader />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
