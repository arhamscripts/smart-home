'use client'
import {
    Home,
    Info,
    Phone,
    Zap,
    Lightbulb,
    Power,
    ShieldAlert,
    Component
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

const mainNavItems = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Aqua Smart",
        url: "/aqua-smart",
        icon: Zap,
    },
    {
        title: "About Us",
        url: "/about",
        icon: Info,
    },
    {
        title: "Contact",
        url: "/contact",
        icon: Phone,
    },
]

const categoryItems = [
    {
        title: "Small Switches",
        url: "/category/small-switches",
        icon: Power,
    },
    {
        title: "LED Lights",
        url: "/category/led-lights",
        icon: Lightbulb,
    },
    {
        title: "Circuit Breakers",
        url: "/category/circuit-breakers",
        icon: ShieldAlert,
    },
    {
        title: "Accessories",
        url: "/category/accessories",
        icon: Component,
    },
]

export function AppSidebar() {
    const { setOpenMobile } = useSidebar()

    return (
        <Sidebar className="border-r-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] bg-zinc-50">
            <SidebarHeader className="bg-zinc-50 pt-6 pb-4">
                <div className="px-4 flex items-center justify-center mb-2">
                    <Link href="/">
                        <Image
                            src="/images/aqua-logo-transparent.png"
                            alt="Aqua Smart Logo"
                            width={120}
                            height={60}
                            className="object-contain drop-shadow-sm transition-transform hover:scale-105"
                        />
                    </Link>
                </div>
            </SidebarHeader>

            <SidebarContent className="bg-zinc-50 px-2">

                {/* Main Navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 px-4">Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            onClick={() => setOpenMobile(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900`}
                                        >
                                            <item.icon className={`w-5 h-5 text-zinc-400 group-hover:text-zinc-700 transition-colors`} />
                                            <span className={`text-[15px] font-medium`}>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Categories */}
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 px-4">Categories</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {categoryItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            onClick={() => setOpenMobile(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-all duration-200 group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-zinc-200 transition-all">
                                                <item.icon className="w-4 h-4 text-zinc-400 group-hover:text-cyan-600 transition-colors" />
                                            </div>
                                            <span className="text-[14px] font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter className="bg-zinc-50 p-6 border-t border-zinc-100">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Technical Support</span>
                    <a href="tel:+923045771313" className="text-sm font-semibold text-cyan-700 hover:text-cyan-600">+92 304 577 1313</a>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}