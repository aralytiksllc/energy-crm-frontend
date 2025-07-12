export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const COLORS = {
  primary: '#1890ff',
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
} as const;

export const FONT_SIZES = {
  xs: 10,
  sm: 11,
  md: 12,
  lg: 13,
  xl: 14,
  xxl: 15,
} as const;

export const COMPONENT_SIZES = {
  avatar: {
    sm: 24,
    md: 32,
    lg: 40,
  },
  button: {
    height: 32,
    padding: '4px 15px',
  },
  card: {
    padding: 16,
    borderRadius: 8,
  },
} as const;
