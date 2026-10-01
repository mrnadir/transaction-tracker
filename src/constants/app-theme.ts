export type AppScheme = 'light' | 'dark';

export type AppColors = {
  background: string;
  surface: string;
  surfaceRaised: string;
  listItem: string;
  border: string;
  borderStrong: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentSoft: string;
  link: string;
  success: string;
  danger: string;
  tabInactive: string;
};

export const Palette: Record<AppScheme, AppColors> = {
  dark: {
    background: '#0E1018',
    surface: '#171A26',
    surfaceRaised: '#1E2232',
    listItem: '#1F2335',
    border: 'rgba(255,255,255,0.07)',
    borderStrong: 'rgba(255,255,255,0.14)',
    text: '#FFFFFF',
    textSecondary: '#9095B8',
    textMuted: '#6B7094',
    accent: '#FF2E8A',
    accentSoft: 'rgba(255,46,138,0.16)',
    link: '#A78BFA',
    success: '#34D399',
    danger: '#FF3B4A',
    tabInactive: '#8F94C4',
  },
  light: {
    background: '#F4F5FA',
    surface: '#FFFFFF',
    surfaceRaised: '#ECEEF5',
    listItem: '#FFFFFF',
    border: 'rgba(20,22,37,0.08)',
    borderStrong: 'rgba(20,22,37,0.14)',
    text: '#141625',
    textSecondary: '#5D6283',
    textMuted: '#8A8FAE',
    accent: '#E91E7A',
    accentSoft: 'rgba(233,30,122,0.12)',
    link: '#7C3AED',
    success: '#16A34A',
    danger: '#EF2D3D',
    tabInactive: '#8A8FAE',
  },
};

export const Brand = {
  bkash: '#E2136E',
  nagad: '#F9A11B',
} as const;

export const Gradients = {
  hero: 'linear-gradient(135deg, #FF4D94 0%, #E4116B 100%)',
  nagadCard: 'linear-gradient(135deg, #FFA041 0%, #F2711C 100%)',
  bar: 'linear-gradient(180deg, #FF4D9A 0%, #D10F63 100%)',
  danger: 'linear-gradient(90deg, #FF4757 0%, #F0263B 100%)',
} as const;

export const ScreenMaxWidth = 560;
export const ScreenPadding = 20;
