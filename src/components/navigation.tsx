"use client";
import Starlight from "@/public/logos/starlight.svg";
import Image from "next/image";
import Link from "next/link";
import { TABS } from "@/data/navigation";
import { usePathname } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { TfiNewWindow } from "react-icons/tfi";
import { signOut } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const Navigation = () => {
  const pathname = usePathname();

  const tabs = TABS[pathname.split("/")[1]];
  const { open, toggleSidebar } = useSidebar();
  return (
    <Sidebar
      collapsible="icon"
      className={`${open ? "w-2/12" : "w-2/12"} text-white`}
    >
      <SidebarHeader
        className={`flex items-center ${open ? "bg-starlight-gray-primary py-8" : "bg-starlight-gray-primary py-4"}`}
      >
        <Image
          src={Starlight}
          className="drop-shadow-yellow-secondary w-5/12"
          alt="Starlight Logo"
        />
        <p className="text-center text-lg">ACM Starlight</p>
      </SidebarHeader>
      <SidebarContent className="bg-starlight-gray-primary">
        {Object.entries(tabs).map(([title, subTabs], index) => (
          <Collapsible
            key={index}
            defaultOpen
            className="group/collapsible pt-0"
          >
            <SidebarGroup className="pt-0">
              {open && (
                <SidebarGroupLabel asChild className="pt-0 text-xl font-bold">
                  <CollapsibleTrigger className="pb-2 text-white">
                    {title}
                    <FaChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
              )}
              <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-transform">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {subTabs.tabs &&
                      subTabs.tabs.map(
                        ({ name, icon, link, target }, index) => (
                          <Link key={index} href={link} target={target}>
                            <SidebarMenuItem
                              key={index}
                              className={`flex h-6 items-center pl-3 text-lg ${link === pathname && ""} rounded`}
                            >
                              <span className={`${!open && "mx-auto"}`}>
                                {icon}
                              </span>
                              {open && (
                                <span className="mr-1 ml-2 flex items-center">
                                  {name}
                                  {target === "_blank" && (
                                    <TfiNewWindow className="text-xl" />
                                  )}
                                </span>
                              )}
                            </SidebarMenuItem>
                          </Link>
                        ),
                      )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter className="bg-starlight-gray-primary flex flex-col p-0 pb-2 pl-1">
        <span
          onClick={() => toggleSidebar()}
          className={`${open ? "h-7 pl-3" : "mx-auto h-6"} flex items-center text-lg hover:cursor-pointer`}
        >
          <span className={`${!open && "mx-auto"}`}>
            <SidebarTrigger className="hover:bg-inherit hover:text-current" />
          </span>
          {open && <span className="ml-2">Close Sidebar</span>}
        </span>
        <span
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className={`${open ? "h-7 pl-3" : "mx-auto h-6"} flex items-center text-lg hover:cursor-pointer`}
        >
          <span className={`${!open && "mx-auto"}`}>
            <CiLogout className="p-0.5 text-xl" />
          </span>
          {open && <span className="ml-2">Log Out</span>}
        </span>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navigation;
