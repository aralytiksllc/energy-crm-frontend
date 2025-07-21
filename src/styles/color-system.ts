export const COLORS = {
  primary: '#1890ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#13c2c2',
  danger: '#ff4d4f',

  text: {
    primary: '#262626',
    secondary: '#8c8c8c',
    disabled: '#d9d9d9',
    light: '#595959',
    muted: '#666',
    white: '#ffffff',
  },

  background: {
    white: '#ffffff',
    light: '#fafafa',
    lighter: '#f5f5f5',
    lightest: '#f0f0f0',
    gray: '#e0e0e0',
    card: '#fafafa',
    skeleton: '#f5f5f5',
    skeletonDark: '#e0e0e0',
    kanban: '#f5f6fa',
    avatarGroup: '#fff7e6',
  },

  border: {
    default: '#f0f0f0',
    light: '#f5f5f5',
    dark: '#d9d9d9',
  },

  taskType: {
    feature: '#52c41a',
    bug: '#ff4d4f',
    review: '#faad14',
    testing: '#722ed1',
    documentation: '#1890ff',
    refactor: '#fa8c16',
    meeting: '#13c2c2',
    deployment: '#eb2f96',
    research: '#52c41a',
    other: '#8c8c8c',
  },

  priority: {
    high: '#ff4d4f',
    medium: '#faad14',
    low: '#52c41a',
    default: '#1890ff',
    critical: '#ff7875',
  },

  status: {
    lead: '#1890ff',
    qualified: '#52c41a',
    proposal: '#faad14',
    negotiation: '#722ed1',
    closedWon: '#52c41a',
    closedLost: '#ff4d4f',
  },

  chart: {
    blue: '#0088FE',
    green: '#00C49F',
    yellow: '#FFBB28',
    orange: '#FF8042',
    purple: '#AF19FF',
    planned: '#8884d8',
    actual: '#82ca9d',
  },

  progress: {
    start: '#108ee9',
    end: '#87d068',
  },

  trend: {
    up: '#3f8600',
    down: '#cf1322',
    neutral: '#8c8c8c',
  },

  special: {
    warningLight: '#fff7e6',
    transparent: 'transparent',
    black: '#000000',
    black40: '#00000040',
    overlayDrag: '#00000040',
    textMutedDark: '#888',
    iconDisabledLight: '#d9d9d9',
  },

  icon: {
    primary: '#1890ff',
    secondary: '#666',
    disabled: '#d9d9d9',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#13c2c2',
  },

  avatar: {
    orange: '#f56a00',
    orangeBg: '#fde3cf',
    blue: '#1677ff',
  },

  badge: {
    bg: '#00b3a4',
    text: '#fff',
  },

  card: {
    bg: '#ffffff',
    border: '#f0f0f0',
    shadow: 'rgba(0, 0, 0, 0.06)',
  },

  dark: {
    bgBase: '#23232b',
    bgContainer: '#292933',
    border: '#44444a',
    text: '#f4f4f4',
    cardBg: '#292933',
    cardBorder: '#44444a',
    textPrimary: '#f4f4f4',
  },
} as const;

export const getTaskTypeColor = (taskType: string): string => {
  const typeColors: Record<string, string> = {
    FEATURE: COLORS.taskType.feature,
    BUG: COLORS.taskType.bug,
    CODE_REVIEW: COLORS.taskType.review,
    TESTING: COLORS.taskType.testing,
    DOCUMENTATION: COLORS.taskType.documentation,
    REFACTOR: COLORS.taskType.refactor,
    MEETING: COLORS.taskType.meeting,
    DEPLOYMENT: COLORS.taskType.deployment,
    RESEARCH: COLORS.taskType.research,
    OTHER: COLORS.taskType.other,
  };

  return typeColors[taskType] || COLORS.taskType.other;
};

export const getPriorityColor = (priority: string): string => {
  const priorityColors: Record<string, string> = {
    high: COLORS.priority.high,
    medium: COLORS.priority.medium,
    low: COLORS.priority.low,
    critical: COLORS.priority.critical,
  };

  return priorityColors[priority.toLowerCase()] || COLORS.priority.default;
};

export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    lead: COLORS.status.lead,
    qualified: COLORS.status.qualified,
    proposal: COLORS.status.proposal,
    negotiation: COLORS.status.negotiation,
    'closed-won': COLORS.status.closedWon,
    'closed-lost': COLORS.status.closedLost,
  };

  return statusColors[status.toLowerCase()] || COLORS.status.lead;
};

export const getTrendColor = (trend: 'up' | 'down' | 'neutral'): string => {
  switch (trend) {
    case 'up':
      return COLORS.trend.up;
    case 'down':
      return COLORS.trend.down;
    default:
      return COLORS.trend.neutral;
  }
};

export const CHART_COLORS = [
  COLORS.chart.blue,
  COLORS.chart.green,
  COLORS.chart.yellow,
  COLORS.chart.orange,
  COLORS.chart.purple,
] as const;

export const BAR_CHART_COLORS = {
  planned: COLORS.chart.planned,
  actual: COLORS.chart.actual,
} as const;
