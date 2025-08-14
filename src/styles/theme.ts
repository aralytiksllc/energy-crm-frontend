export const THEME = {
  colors: {
    primary: '#1890ff',
    primaryBg: '#E6F7FF',
    primaryBorder: '#91D5FF',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#13c2c2',
    text: {
      primary: '#262626',
      secondary: '#8c8c8c',
      disabled: '#d9d9d9',
    },
    background: {
      light: '#fafafa',
      white: '#ffffff',
      border: '#f0f0f0',
    },
    border: {
      light: '#f0f0f0',
      dashed: '#d9d9d9',
    },
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
    md: 6,
    lg: 8,
  },
  fontSize: {
    xs: 10,
    sm: 11,
    md: 12,
    lg: 13,
    xl: 14,
    xxl: 15,
    title: 16,
    large: 18,
  },
} as const;

// Export individual color constants for easy access
export const COLORS = THEME.colors;
export const SPACING = THEME.spacing;
export const BORDER_RADIUS = THEME.borderRadius;
export const FONT_SIZE = THEME.fontSize;
