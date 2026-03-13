"use client";
import {
  ThemeProvider as NextThemeProvider,
  ThemeProviderProps,
} from "next-themes";

interface NextThemeProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function ThemeProvider({ children, themeProps }: NextThemeProps) {
  return <NextThemeProvider {...themeProps}>{children}</NextThemeProvider>;
}
