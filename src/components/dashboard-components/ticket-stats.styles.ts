import { createStyles, css } from 'antd-style';

export const useTicketStatsStyles = createStyles(
  ({ css }, props: { iconColor?: string; valueColor?: string }) => ({
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
    contentContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '250px',
    },
    taskTypeGrid: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    taskTypeItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 8px',
      backgroundColor: '#fafafa',
      borderRadius: '4px',
      minHeight: '32px',
    },
    taskTypeContent: {
      flex: 1,
      minWidth: 0,
    },
    taskTypeCount: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
    taskTypeName: {
      fontSize: '10px',
      color: '#666',
      lineHeight: '1.2',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    emptyState: {
      textAlign: 'center',
      color: '#8c8c8c',
      padding: '16px',
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fullWidth: {
      width: '100%',
    },
    value: {
      color: props.valueColor,
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
    },
    taskTypeHeader: {
      marginBottom: '12px',
      display: 'block',
    },
    icon: {
      color: props.iconColor,
    },
  }),
);

export { css };
