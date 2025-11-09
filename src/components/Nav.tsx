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
  const { user, logout, loading, isAdmin } = useAuth();

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
          <NavigationMenuList className="list-none flex items-center gap-2">
            {user ? (
              <>
                <NavigationMenuItem>
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-white 
             font-semibold uppercase select-none"
                  >
                    {(user.email?.[0] ?? "U").toUpperCase()}
                  </div>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/quotes/new"
                      className="px-3 py-1 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
                    >
                      Add Quote
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/quotes/manage"
                      className="px-3 py-1 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
                    >
                      Manage Quotes
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/user/settings"
                      className="px-3 py-1 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
                    >
                      Settings
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {isAdmin && (
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/admin"
                        className="px-3 py-1 rounded-lg font-semibold text-amber-500 hover:bg-slate-300 dark:hover:bg-slate-700"
                      >
                        Admin
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}

                <NavigationMenuItem>
                  <button
                    type="button"
                    onClick={logout}
                    className="px-3 py-1 border rounded-lg dark:border-slate-600 border-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
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
