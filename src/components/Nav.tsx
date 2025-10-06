import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

import { ModeToggle } from "./ModeToggle";

export function Nav() {
  return (
    <div className="flex items-center gap-4">
      <NavigationMenu>
        {/* <NavigationMenuItem>
              {/* <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem> */}

        <NavigationMenuList className="list-none flex items-center gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink href="/login">Login</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/signup">Sign up</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <ModeToggle />
    </div>
  );
}
