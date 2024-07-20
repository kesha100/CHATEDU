"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <NextThemeProvider
      enableSystem={false}
      defaultTheme="dark"
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
