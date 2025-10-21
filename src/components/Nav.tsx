"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/app/AuthProvider";
import Link from "next/link";

export function Nav() {
  const { user, logout, loading } = useAuth();

  if (loading) return null;

  return (
    <nav className="flex w-full items-center justify-between">
      <h1 className="text-lg font-bold">
        <Link href="/" prefetch={false}>
          Random Quotes
        </Link>
      </h1>

      <div className="flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList className="list-none flex items-center gap-4">
            {user ? (
              <>
                <NavigationMenuItem>
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {user.email}
                  </span>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button
                    onClick={logout}
                    className="px-3 py-1 border rounded-lg dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    Logout
                  </button>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/user/login">
                    Login
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/user/signup">
                    Sign Up
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <ModeToggle />
      </div>
    </nav>
  );
}
