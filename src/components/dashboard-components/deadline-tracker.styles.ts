import { createStyles } from 'antd-style';

export const useDeadlineTrackerStyles = createStyles(
  (
    { css },
    props: { overdue?: boolean; priorityColor?: string; iconColor?: string },
  ) => ({
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
    fullWidth: {
      width: '100%',
    },
    itemContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    itemContent: {
      flex: 1,
      marginRight: '8px',
    },
    itemHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      marginBottom: '4px',
    },
    title: {
      fontSize: '13px',
    },
    projectName: {
      fontSize: '11px',
    },
    dueDate: {
      fontSize: '11px',
      color: props.overdue ? '#ff4d4f' : '#666',
      fontWeight: props.overdue ? 'bold' : 'normal',
    },
    priorityTag: {
      fontSize: '10px',
      marginTop: '2px',
      backgroundColor: props.priorityColor,
      borderColor: props.priorityColor,
    },
    empty: {
      padding: '20px 0',
    },
    itemRight: {
      textAlign: 'right',
    },
    icon: {
      color: props.iconColor,
    },
  }),
);
