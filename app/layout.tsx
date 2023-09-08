import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/themeProvider";
import { SiteHeader } from "@/components/nav/siteHeader";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Supabase Auth",
  description:
    "Supabase Auth Template with Next.js 13. Cookie-based authentication offers a secure and streamlined method for managing user sessions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  return (
    <html lang="en">
      <body className="">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {pathname !== "/login" &&
            pathname !== "/send-reset-password-email" &&
            pathname !== "/signup" &&
            pathname !== "/reset-password" && <SiteHeader />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
