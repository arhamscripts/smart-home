"use client";

import React from "react";
import Link from "next/link";
import { User, UserCircle, LogOut, Settings, LayoutDashboard, Package } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

export default function UserAvatar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  if (isPending) {
    return <Skeleton className="h-9 w-9 rounded-full sm:h-10 sm:w-24 bg-muted/60" />;
  }

  if (!user) {
    return (
      <Button
        asChild
        size="sm"
        className="cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-9 px-3 sm:h-10 sm:px-4 sm:text-sm shadow-md"
      >
        <Link href="/login">
          <User className="h-4 w-4 mr-0 sm:mr-2" />
          <span className="hidden sm:inline-block">Login</span>
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex cursor-pointer text-foreground/80 hover:bg-muted hover:text-foreground rounded-full h-9 px-2 sm:h-10 sm:px-3 sm:text-sm items-center justify-center gap-2 transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-primary/20">
          <UserCircle className="h-5 w-5 shrink-0" />
          <span className="max-sm:hidden truncate max-w-[100px] font-medium">
            {user.name?.split(" ")[0] || "Account"}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.role === "admin" && (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/admin" className="flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/account/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/orders/${user.id}`} className="flex items-center">
              <Package className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
