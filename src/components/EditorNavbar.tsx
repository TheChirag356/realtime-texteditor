import { Menu, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import CollaborateButton from "@/components/CollaborateButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import ChooseLanguage from "@/components/ChooseLanguage";
import { nanoid } from "nanoid";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Session = {
  id: string | null;
  isSessionLive: boolean;
};

function NavbarMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function EditorNavbar({ className }: { className?: string }) {
  return (
    <div
      className={`flex max-w-dvw items-center justify-between m-4 ${className}`}
    >
      <NavbarMenu />
      <ChooseLanguage />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <CollaborateButton />
      </div>
    </div>
  );
}
