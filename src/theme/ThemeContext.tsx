import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { lightColors, darkColors } from './colors';
import { ColorTokens } from '../types/screens.types';

interface ThemeContextValue {
  isDark: boolean;
  colors: ColorTokens;
  toggleTheme: () => void;
  setSystemTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme() || 'light'
  );
  const [override, setOverride] = useState<ColorSchemeName | null>(null);

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme || 'light');
    });
    return () => sub.remove();
  }, []);

  const isDark = (override ?? systemScheme) === 'dark';
  const colors = isDark ? darkColors : lightColors;

  const toggleTheme = () => setOverride(isDark ? 'light' : 'dark');
  const setSystemTheme = () => setOverride(null);

  const value = useMemo<ThemeContextValue>(
    () => ({ isDark, colors, toggleTheme, setSystemTheme }),
    [isDark, colors]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
