export const THEME_PRESETS = {
  isame: {
    label: 'Isame Collection',
    colors: {
      primary: '#D4AF37',
      secondary: '#A7A9AC',
      accent: '#E6B800',
      background: '#1A1A1A',
      surface: '#FFFFFF',
      text: '#FFFFFF',
      muted: '#717182',
      border: '#A7A9AC',
      link: '#D4AF37',
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Inter',
    },
    buttons: {
      radius: '0.375rem',
    },
  },
  luxury: {
    label: 'Luxury Tropical',
    colors: {
      primary: '#FFD700',
      secondary: '#E6B800',
      accent: '#FFF3B0',
      background: '#0A0A0A',
      surface: '#111827',
      text: '#FFFFFF',
      muted: '#9CA3AF',
      border: '#2A2A2A',
      link: '#FFD700',
    },
    typography: {
      headingFont: 'Baskervville',
      bodyFont: 'Prompt',
    },
    buttons: { radius: '0.5rem' },
  },
  elegant: {
    label: 'Elegant Resort',
    colors: {
      primary: '#D4AF37',
      secondary: '#B8860B',
      accent: '#F5E6A8',
      background: '#111111',
      surface: '#1A1A1A',
      text: '#F8F8F8',
      muted: '#A3A3A3',
      border: '#333333',
      link: '#D4AF37',
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Poppins',
    },
    buttons: { radius: '0.75rem' },
  },
  minimal: {
    label: 'Modern Minimal',
    colors: {
      primary: '#0EA5E9',
      secondary: '#0284C7',
      accent: '#38BDF8',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#0F172A',
      muted: '#64748B',
      border: '#E2E8F0',
      link: '#0284C7',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
    buttons: { radius: '0.375rem' },
  },
  caribbean: {
    label: 'Caribbean Vibrant',
    colors: {
      primary: '#06B6D4',
      secondary: '#14B8A6',
      accent: '#F59E0B',
      background: '#082F49',
      surface: '#0F172A',
      text: '#FFFFFF',
      muted: '#CBD5E1',
      border: '#164E63',
      link: '#67E8F9',
    },
    typography: {
      headingFont: 'Prompt',
      bodyFont: 'Poppins',
    },
    buttons: { radius: '9999px' },
  },
} as const

export type ThemePresetKey = keyof typeof THEME_PRESETS
