
import React from "react";
import { NavigationMenuDemo } from "./navigation-menu";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { Phone } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import UserAvatar from "./user-avatar";
import WishlistDrawer from "./wishlist-drawer";
import Link from "next/link";
import HeaderClient from "./header-client";
import NextImage from "next/image";
import TypingText from "../ui/typing-text";
import { ThemeToggle } from "./theme-toggle";
import Lottie from "lottie-react";
import animationData from "../../../public/images/Animated Dashboards.json";

const Header = ({ fontColor = "gray-900" }) => {
  return (
    <HeaderClient>

      <div className="mx-auto flex w-full items-center justify-between gap-2 px-3 py-2 text-center sm:gap-4 sm:px-5 lg:gap-8 lg:px-6">
        <div className="logo shrink-0">
          <NextImage
            src="/images/aqua-logo-transparent.png"
            alt="Logo"
            width={100}
            height={50}
            className="h-auto w-[72px] sm:w-[88px] md:w-[100px]"
          />

          {/* <Lottie animationData={animationData} loop={true} /> */}
        </div>
        <nav className="menu max-lg:hidden">
          <NavigationMenuDemo />
        </nav>
        <div className="userActions flex min-w-0 shrink items-center gap-1 sm:gap-2 lg:gap-4">
          <UserAvatar />
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            asChild
          >
            <Link href="/cart">
              <ShoppingBag color="black" className="h-5 w-5" />
            </Link>
          </Button>
          <WishlistDrawer>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Heart color="black" className="h-5 w-5" />
            </Button>
          </WishlistDrawer>

          <div className="hidden shrink-0 max-lg:block">
            <SidebarTrigger />
          </div>
          {/* <ThemeToggle  className="text-black"/> */}
        </div>
      </div>
    </HeaderClient>
  );
};

export default Header;
