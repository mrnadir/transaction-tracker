import { createContext, use, useState, type ReactNode } from 'react';

import { Palette, type AppColors, type AppScheme } from '@/constants/app-theme';

type AppThemeValue = {
  scheme: AppScheme;
  colors: AppColors;
  toggleScheme: () => void;
};

const AppThemeContext = createContext<AppThemeValue | null>(null);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [scheme, setScheme] = useState<AppScheme>('dark');

  const value: AppThemeValue = {
    scheme,
    colors: Palette[scheme],
    toggleScheme: () => setScheme((current) => (current === 'dark' ? 'light' : 'dark')),
  };

  return <AppThemeContext value={value}>{children}</AppThemeContext>;
}

export function useAppTheme() {
  const value = use(AppThemeContext);
  if (!value) {
    throw new Error('useAppTheme must be used inside AppThemeProvider');
  }
  return value;
}
