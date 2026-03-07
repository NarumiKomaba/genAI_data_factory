"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="lg:hidden sticky top-0 z-50 h-14 border-b bg-background/80 backdrop-blur-sm flex items-center px-4 gap-3">
      <Button variant="ghost" size="icon" onClick={onMenuClick}>
        <Menu className="size-5" />
      </Button>
      <Image
        src="/DataFactoryロゴ.png"
        alt="GenAI Data Factory"
        width={160}
        height={36}
        className="h-9 w-auto"
      />
    </header>
  );
}
