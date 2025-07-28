export const DASHBOARD_TABLES_CONSTANTS = {
  COLORS: {
    PRIMARY: 'var(--color-primary)',
    TEXT_PRIMARY: 'var(--color-text-primary)',
    TEXT_SECONDARY: 'var(--color-text-secondary)',
    BORDER: 'var(--color-border)',
    BORDER_LIGHT: 'var(--color-border-light)',
    SUCCESS: 'var(--color-success)',
    WARNING: 'var(--color-warning)',
    ERROR: 'var(--color-error)',
    CRITICAL: 'var(--color-priority-critical)',
  },
  SPACING: {
    CARD_PADDING: '24px',
    SECTION_MARGIN: 20,
    ITEM_PADDING: '16px 0',
    EMPTY_PADDING: '40px 0',
  },
  TYPOGRAPHY: {
    AVATAR_FONT_SIZE: 12,
    TAG_FONT_SIZE: 11,
    SECONDARY_FONT_SIZE: 12,
    DESCRIPTION_FONT_SIZE: 14,
  },
  STYLES: {
    CARD_BORDER_RADIUS: 12,
    TAG_BORDER_RADIUS: 12,
    CARD_SHADOW: '0 2px 8px rgba(0,0,0,0.06)',
  },
  MOCK_DATA: {
    LATEST_LEADS: [
      {
        key: '1',
        initials: 'WE',
        name: 'WEXMAC RTOP Greece',
        source: 'USG',
        status: 'LEAD',
        createdAt: '5/27/2025',
      },
      {
        key: '2',
        initials: 'KO',
        name: 'Kosovo Police Training',
        source: 'Non USG',
        status: 'LEAD',
        createdAt: '5/27/2025',
      },
      {
        key: '3',
        initials: 'CO',
        name: 'Construction Romania AFB',
        source: 'USG',
        status: 'LEAD',
        createdAt: '5/27/2025',
      },
    ],
  },
  TASK_FILTER: {
    DAYS_AHEAD: 30,
    MAX_TASKS: 5,
  },
  PRIORITY_COLORS: {
    Low: 'var(--color-priority-low)',
    Medium: 'var(--color-priority-medium)',
    High: 'var(--color-priority-high)',
    Critical: 'var(--color-priority-critical)',
  },
};
