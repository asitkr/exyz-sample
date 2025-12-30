import { ReactNode } from "react";

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}