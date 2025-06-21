"use client"
import { cn } from '@/lib/utils';
import { CalendarRange, Car, Cog, LayoutDashboard, LayoutDashboardIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const routes =[
    {
        label:"Dasdboard",
        icon: LayoutDashboardIcon,
        href:"/admin",
    },
    {
        label:"Cars",
        icon: Car,
        href: "/admin/cars",
    },
    {
        label:"Test Drives",
        icon: CalendarRange,
        href: "/admin/test-drives",
    },
    {
        label : "Settings",
        icon : Cog,
        href:"/admin/settings",
    },
];
const Sidebar = () => {

    const pathname = usePathname()

    return( 
        <>
            <div className="hidden md:flex h-full flex-col overflow-y-auto bg-white shadow-sm border-r">
                {routes.map((route) =>{
                    return (
                    <Link key={route.href} href={route.href}
                        className={cn(
                            `flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6
                            transition-all hover:text-slate-600 hover:bg-slate-100/50 h-12`,
                            pathname===route.href ? 
                                "text-blue-700 bg-blue-100/50 hover:bg-blue-100 hover:text-blue-700"
                            :
                            ""
                    )}
                    >
                        <route.icon className="h-5 w-5" />
                        {route.label}
                    </Link>)
                })}
            </div>
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white boarder-t flex justify-around
            items-center h-16">
                
            </div>
        </>
    );
};

export default Sidebar;
