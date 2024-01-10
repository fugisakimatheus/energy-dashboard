"use client";

import { NextUIProvider } from "@nextui-org/react";
import { DarkModeProvider } from "./contexts/dark-mode-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <DarkModeProvider>{children}</DarkModeProvider>
    </NextUIProvider>
  );
}
