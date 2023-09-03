"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { MdSpaceDashboard } from "react-icons/md";
import * as React from "react";
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
import { AuthAvatar } from "@/components/authAvatar";

export function SiteHeader() {
  const router = useRouter();

  const { setTheme } = useTheme();

  const handleGoToAccount = () => {
    router.push("/account");
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
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button onClick={handleGoToAccount}>Account</button>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <button>Sign Out</button>
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
