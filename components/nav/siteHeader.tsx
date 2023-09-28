"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { MdSpaceDashboard } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AuthAvatar } from "@/components/avatar/authAvatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { get } from "http";

type User = {
  id: string;
  // define the properties of your User type here
};

export function SiteHeader() {
  const [user, setUser] = React.useState<User | null>(null);
  const { setTheme } = useTheme();
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleGoToAccount = () => {
    router.push("/account");
  };

  // Create a function to handle inserts

  useEffect(() => {}, []);

  const handleNavigation = () => {
    window.location.href = "/login";
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/auth/sign-out", {
        method: "POST",
      });

      if (res.status === 200) {
        console.log("Signed out successfully");
        handleNavigation();
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="py-2 flex items-center space-x-4 px-4 justify-between sm:space-x-0">
        <nav>
          <Link href={"/"} className="flex gap-2 items-center text-2xl">
            <MdSpaceDashboard />
            <h1 className="font-bold ">Supabase Auth</h1>
          </Link>{" "}
        </nav>

        <div className="flex gap-4 items-center">
          <div id="avatar" className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AuthAvatar />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button onClick={handleGoToAccount}>Profile</button>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <button onClick={handleSignOut}>Log Out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div id="dark-light-mode">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
