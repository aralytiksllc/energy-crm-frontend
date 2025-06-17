import { createStyles } from 'antd-style';

export const useStyles = createStyles(() => ({
  kanbanBoard: {
    display: 'flex',
    gap: 12,
    height: '85vh',
    minHeight: 400,
    maxHeight: '85vh',
    alignItems: 'stretch',
    overflowX: 'auto',
    justifyContent: 'flex-start',
    scrollbarWidth: 'thin',
    scrollbarColor: '#bfbfbf transparent',
    selectors: {
      '::-webkit-scrollbar': {
        height: 10,
        background: 'transparent',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#bfbfbf',
        borderRadius: 6,
      },
      '::-webkit-scrollbar-track': {
        background: 'transparent',
      },
    },
  },

  boardOuter: {
    width: 'calc(100% + 64px)',
    height: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'column',
    margin: -32,
  },

  boardInner: {
    width: '100%',
    height: '100%',
    display: 'flex',
    padding: 32,
    overflow: 'scroll',
  },

  kanbanColumn: {
    width: 260,
    minWidth: 260,
    maxWidth: 260,
    display: 'flex',
    flexDirection: 'column',
    height: '95%',
    border: '1px solid #33343a',
    borderRadius: 14,
    flexShrink: 0,
    marginTop: 12,
    overflow: 'hidden',
    transition: 'box-shadow 0.2s, border 0.2s',
    maxHeight: '100%',
  },

  kanbanColumnOver: {
    boxShadow: '0 0 0 2px #52c41a',
    borderColor: '#52c41a',
  },

  kanbanColumnHeader: {
    padding: '10px 16px 8px 16px',
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: '0.5px',
    borderBottom: '1px solid rgb(164, 164, 164)',
  },

  kanbanColumnHeaderContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },

  kanbanColumnHeaderTitle: {
    fontWeight: 600,
    fontSize: 16,
  },

  kanbanColumnHeaderBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 20,
    height: 20,
    padding: '0 6px',
    borderRadius: '50%',
    background: '#fff',
    color: '#000',
    fontWeight: 700,
    fontSize: 11,
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.07)',
  },

  kanbanColumnBody: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px 8px 12px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: '100%',
    scrollbarWidth: 'thin',
    scrollbarColor: '#bfbfbf transparent',
    selectors: {
      '::-webkit-scrollbar': {
        width: 8,
        background: 'transparent',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#bfbfbf',
        borderRadius: 6,
      },
      '::-webkit-scrollbar-track': {
        background: 'transparent',
      },
    },
  },

  kanbanColumnEmpty: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  kanbanItem: {
    margin: '6px 0',
    width: '100%',
    maxWidth: 220,
    borderRadius: 10,
    transition: 'opacity 0.2s, z-index 0.2s, box-shadow 0.2s, border 0.2s',
  },

  kanbanItemDragging: {
    opacity: 0.5,
    zIndex: 1000,
  },
}));
