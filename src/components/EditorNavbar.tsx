import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import CollaborateButton from "@/components/CollaborateButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import ChooseLanguage from "@/components/ChooseLanguage";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
        <DropdownMenuItem>Download</DropdownMenuItem>
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
