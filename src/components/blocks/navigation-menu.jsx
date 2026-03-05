"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ArrowRight } from "lucide-react"


export function NavigationMenuDemo({}) {
  const isMobile = useIsMobile()
  
  

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap justify-center">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/" className={`bg-transparent text-[16px] font-normal text-black hover:bg-transparent`}>Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/product" className={`bg-transparent text-[16px] font-normal text-black hover:bg-transparent`}>All Products</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/sale" className={`bg-transparent text-[16px] font-normal text-black hover:bg-transparent`}>Sale</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/about" className={`bg-transparent text-[16px] font-normal text-black hover:bg-transparent`}>About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/contact" className={`bg-transparent text-[16px] font-normal text-black hover:bg-transparent`}>Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`bg-transparent text-[16px] font-normal text-black hover:bg-transparent`}>Shop</NavigationMenuTrigger>
          <NavigationMenuContent className='z-5'>
            <ul className="grid gap-2 md:w-100 lg:w-125 lg:grid-cols-[1fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="#"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4 h-[10vh] flex flex-col justify-end">
                      Smart Home
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>

              <li className="row-span-3">
                <div>
                  <NavigationMenuLink asChild>
                    <Link href="/category/cam-switches">Cam Switches</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/category/led-lights">LED Lights</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/category/capacitors">Capacitors</Link>
                  </NavigationMenuLink>
                  
                  <NavigationMenuLink asChild>
                    <Link href="/category" className="flex-row items-center gap-2 ">All Categories<ArrowRight /></Link>
                  </NavigationMenuLink>
                </div>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
