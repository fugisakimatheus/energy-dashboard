"use client";

import { Button } from "@nextui-org/react";
import { useDarkMode } from "@/app/contexts/dark-mode-context";

export default function ThemeToggle() {
  const { toggleDarkMode } = useDarkMode();
  return <Button onClick={() => toggleDarkMode()}>Toggle theme</Button>;
}
