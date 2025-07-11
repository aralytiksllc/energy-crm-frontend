import { createStyles } from 'antd-style';

export const useDeadlineTrackerStyles = createStyles(() => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  cardBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
  },
  listContainer: {
    flex: 1,
    overflowY: 'auto',
    maxHeight: '400px',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#c1c1c1',
      borderRadius: '3px',
      '&:hover': {
        background: '#a8a8a8',
      },
    },
  },
  listItem: {
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  emptyContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
  },
}));
