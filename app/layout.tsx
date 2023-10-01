"use client";

import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/themeProvider";
import { SiteHeader } from "@/components/nav/siteHeader";

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
