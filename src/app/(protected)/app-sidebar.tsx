'use client'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { BotIcon, CreditCard, LayoutDashboard, Plus, Presentation } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils" // Make sure to import cn
import { Button } from "@/components/ui/button"
import Image from "next/image"

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Q&A",
        url: "/qa",
        icon: BotIcon
    },
    {
        title: "Meetings",
        url: "/meetings",
        icon: Presentation
    },
    {
        title: "Billing",
        url: "/billing",
        icon: CreditCard
    }
]

const projects = [
    {
        name: "Project A"
    },
    {
        name: "Project B"
    },
    {
        name: "Project C"
    }
]

export function AppSidebar() {
    const pathname = usePathname()
    const {open} = useSidebar()
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Image 
                        src="/Logo.png" 
                        alt="CodePulse Logo"
                        width={60}  // Set appropriate width
                        height={40}  // Set appropriate height
                    />
                    {open && (
                        <h1 className="text-xl font-bold text-primary/80 ">
                            CodePulse
                        </h1>
                    )}

                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Application
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(item => {
                            const Icon = item.icon // Assign icon to component variable
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link 
                                            href={item.url} 
                                            className={cn(
                                                'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
                                                {
                                                    'bg-primary text-white': pathname === item.url,
                                                    'hover:bg-accent': pathname !== item.url
                                                }, 'list-none'
                                            )}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Your Projects 
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {projects.map(project => {
                                return (
                                    <SidebarMenuItem key={project.name}>
                                        <SidebarMenuButton asChild>
                                            <div>
                                                <div className = {cn(
                                                    'rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary' ,
                                                    {
                                                        'bg-primary text-white ' : true
                                                    }
                                                )} >
                                                    {project.name[0]}
                                                </div>
                                                <span>{project.name}</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}

                            <div className="h-2"></div>
                            {open && (
                                <SidebarMenuItem>
                                    <Link href = '/create'>
                                        <Button size='sm' variant={'outline'} className="w-fit">
                                            <Plus/>
                                            Create Project 
                                        </Button>
                                    </Link>
                                    
                                </SidebarMenuItem>
                            )}


                        </SidebarMenu>


                    </SidebarGroupContent>
                </SidebarGroup>

                
            </SidebarContent>
        </Sidebar>
    )
}