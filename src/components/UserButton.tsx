"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./ui/dropdown-menu";
import { useSession } from "@/app/(main)/SessionProvider";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from "lucide-react";
import { logout } from "@/app/(auth)/actions";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  DropdownMenuPortal,
  DropdownMenuSub,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";

interface UserButtonProps {
  className?: string;
}

const UserButton = ({ className }: UserButtonProps) => {
  const { user } = useSession();
  const { theme, setTheme } = useTheme();
  const queryClient = useQueryClient();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Loggin as @{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/user/${user.id}`}>
          <DropdownMenuItem>
            <UserIcon />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="absolute ml-25">Theme</span>
            </Button>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                Light
                {theme == "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="h-[1.2rem] w-[1.2rem]" />
                Dark
                {theme == "dark" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="h-[1.2rem] w-[1.2rem]" />
                System
                {theme == "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            queryClient.clear();
            logout();
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
