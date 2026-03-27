const brand = {
  primary: '#1A3C34',
  accent: '#6BCBB8',
  accentLight: '#E8F5F0',
  white: '#FFFFFF',
  error: '#E53E3E',
  success: '#38A169',
  warning: '#F59E0B',
};

const verticalColors = {
  auto: { main: '#3B82F6', light: '#EFF6FF' },
  home: { main: '#F59E0B', light: '#FFFBEB' },
  health: { main: '#6BCBB8', light: '#E8F5F0' },
  life: { main: '#8B5CF6', light: '#F5F3FF' },
};

export { brand, verticalColors };

export default {
  light: {
    text: '#1A3C34',
    textSecondary: '#4A5568',
    textMuted: '#94A3B8',
    background: '#FFFFFF',
    surface: '#F8FAFA',
    tint: brand.primary,
    tabIconDefault: '#94A3B8',
    tabIconSelected: brand.primary,
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',
    primary: brand.primary,
    accent: brand.accent,
    accentLight: brand.accentLight,
    error: brand.error,
    success: brand.success,
    warning: brand.warning,
  },
  dark: {
    text: '#E8F5F0',
    textSecondary: '#A7C4BC',
    textMuted: '#5A8A7D',
    background: '#0C1E18',
    surface: '#132E25',
    tint: brand.accent,
    tabIconDefault: '#3D6B5E',
    tabIconSelected: brand.accent,
    card: '#162F27',
    cardBorder: '#234A3E',
    primary: brand.accent,
    accent: brand.accent,
    accentLight: '#1A3C34',
    error: '#FC8181',
    success: '#68D391',
    warning: '#FBD38D',
  },
};
