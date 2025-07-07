import { createStyles as createAntdStyles } from 'antd-style';

export const createStyles = createAntdStyles(({ token }) => ({
  avatar: {
    fontSize: '8px',
    lineHeight: '16px',
    minWidth: '16px',
    minHeight: '16px',
    borderRadius: '50%',
  },
  calendarContainer: {
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadius,
    overflow: 'visible',
    position: 'relative',
    minHeight: 'auto',

    '& *': {
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',

      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },

    '& .ant-picker-calendar': {
      backgroundColor: token.colorBgContainer,
      border: 'none',
      borderRadius: 0,
      overflow: 'visible',
      position: 'relative',
      height: 'auto',
    },

    '& .ant-picker-calendar-header': {
      padding: `${token.paddingMD}px ${token.paddingLG}px`,
      borderBottom: `1px solid ${token.colorBorder}`,
      backgroundColor: token.colorBgContainer,
      zIndex: 20,
    },

    '& .ant-picker-calendar-date': {
      border: `1px solid ${token.colorBorderSecondary}`,
      borderRadius: 0,
      margin: 0,
      minHeight: '250px',
      height: 'auto',
      padding: '4px',
      backgroundColor: token.colorBgContainer,
      position: 'relative',
      overflow: 'visible',
      zIndex: 15,
      verticalAlign: 'top',

      '&:hover': {
        backgroundColor: token.colorBgTextHover,
        cursor: 'pointer',
        zIndex: 16,
      },

      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: 0,
        pointerEvents: 'none',
        zIndex: 12,
      },
    },

    '& .ant-picker-calendar-date-today': {
      borderColor: token.colorPrimary,
      backgroundColor: `${token.colorPrimary}08`,

      '&:hover': {
        backgroundColor: `${token.colorPrimary}15`,
      },

      '&::after': {
        borderColor: token.colorPrimary,
      },
    },

    '& .ant-picker-calendar-date-selected': {
      backgroundColor: token.colorPrimaryBg,
      borderColor: token.colorPrimary,

      '&::after': {
        borderColor: token.colorPrimary,
      },
    },

    '& .ant-picker-calendar-header th': {
      backgroundColor: token.colorBgContainer,
      borderBottom: `1px solid ${token.colorBorder}`,
      color: token.colorTextSecondary,
      fontWeight: 500,
      padding: '12px 8px',
      textAlign: 'center',
      zIndex: 20,
    },

    '& .ant-picker-calendar-date-content': {
      height: 'auto',
      minHeight: '200px',
      overflow: 'visible',
      position: 'relative',
      zIndex: 13,
    },

    '& .ant-picker-calendar-tbody > tr > td': {
      position: 'relative',
      height: 'auto',
      verticalAlign: 'top',
    },

    '& .ant-picker-calendar-tbody > tr': {
      height: 'auto',
    },

    '& .ant-picker-calendar-tbody': {
      height: 'auto',
    },

    '& .ant-picker-calendar table': {
      height: 'auto',
    },
  },

  calendarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${token.paddingSM}px ${token.paddingMD}px`,
    backgroundColor: token.colorBgContainer,
    borderBottom: `1px solid ${token.colorBorder}`,
  },

  calendarCell: {
    height: 'auto',
    minHeight: '180px',
    padding: '4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'visible',
    zIndex: 13,

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },

  singleDayAssignmentsContainer: {},

  priorityIndicator: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    marginLeft: 'auto',
  },

  statusIndicator: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    marginLeft: 'auto',
    flexShrink: 0,
  },

  assignmentText: {
    textDecoration: 'none',
  },

  cancelledText: {
    textDecoration: 'line-through',
  },

  spanningAssignmentText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  assignmentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: '6px',
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorderSecondary}`,
    marginBottom: '2px',
    fontSize: '11px',
    minHeight: '22px',
    position: 'relative',
    zIndex: 14,

    '&:hover': {
      backgroundColor: token.colorPrimaryBg,
      borderColor: token.colorPrimary,
      zIndex: 17,
    },
  },

  spanningAssignmentItem: {
    position: 'absolute',
    top: '4px',
    left: '4px',
    right: '-1px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '1px 4px',
    borderRadius: '6px',
    backgroundColor: token.colorPrimaryBg,
    border: `1px solid ${token.colorPrimary}`,
    fontSize: '10px',
    fontWeight: 500,
    zIndex: 5,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',

    '&.assignment-start': {
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
      borderTopRightRadius: '2px',
      borderBottomRightRadius: '2px',
    },

    '&.assignment-middle': {
      borderRadius: '2px',
      borderLeft: 'none',
    },

    '&.assignment-end': {
      borderTopLeftRadius: '2px',
      borderBottomLeftRadius: '2px',
      borderTopRightRadius: '9px',
      borderBottomRightRadius: '9px',
      borderLeft: 'none',
      right: '4px',
    },

    '&.assignment-single': {
      borderRadius: '6px',
      right: '4px',
    },

    '&:hover': {
      backgroundColor: token.colorPrimary,
      color: token.colorWhite,
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      zIndex: 18,
    },
  },

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
}));
