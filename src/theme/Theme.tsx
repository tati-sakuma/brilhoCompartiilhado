import { ThemeType } from '../types';

export const lightTheme: ThemeType = {
  colors: {
    primary: '#6366f1',
    background: '#ffffff',
    card: '#f3f4f6',
    text: '#1f2937',
    border: '#e5e7eb',
    notification: '#ef4444',
    placeholder: '#9ca3af',
    error: '#ef4444',
    accent: '#8b5cf6',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
};

export const darkTheme: ThemeType = {
  colors: {
    primary: '#818cf8',
    background: '#111827',
    card: '#1f2937',
    text: '#f9fafb',
    border: '#374151',
    notification: '#f87171',
    placeholder: '#6b7280',
    error: '#f87171',
    accent: '#a78bfa',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
};