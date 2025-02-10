import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800">
      <nav className="flex items-center justify-between p-4 bg-background border-b-2">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            Rich Text Editor
          </Link>
          <Link href="/form" className="text-sm font-medium">
            Form Editor
          </Link>
          <Link href="/novel" className="text-sm font-medium">
            Novel Editor
          </Link>
        </div>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Header;
