"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import logo from "@/public/ACMStarlightLogo.webp";

const Navigation = () => {
  const pathname = usePathname();
  return (
    <NavigationMenu className="flex max-w-full items-center justify-between bg-starlight-blue p-4 text-white">
      <Link className="flex items-center" href="/">
        <div className="relative h-14 w-14">
          <Image
            className="object-contain"
            src={logo}
            alt="ACM Starlight Logo"
          />
        </div>
      </Link>

      <NavigationMenuList className="mx-14 flex gap-8">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/user/applications"
              className={`text-white ${
                pathname === "/user/applications"
                  ? "underline underline-offset-8"
                  : ""
              }`}
            >
              Applications
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/user/profile"
              className={`text-white ${
                pathname === "/user/profile"
                  ? "underline underline-offset-8"
                  : ""
              }`}
            >
              Profile
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
