import { createContext } from 'react';
import { ThemeContextType } from './interface';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);