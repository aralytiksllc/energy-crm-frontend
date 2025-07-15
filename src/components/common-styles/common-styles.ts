import { createStyles } from 'antd-style';
import { SPACING, COLORS, FONT_SIZES } from '../../styles/constants';

export const useCommonStyles = createStyles(
  ({ css }, props: { color?: string }) => ({
    fullWidth: {
      width: '100%',
    },

    fullHeight: {
      height: '100%',
    },

    flexCenter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    flexBetween: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    flexColumn: {
      display: 'flex',
      flexDirection: 'column',
    },

    marginBottom: {
      marginBottom: SPACING.md,
    },

    marginTop: {
      marginTop: SPACING.md,
    },

    padding: {
      padding: SPACING.md,
    },

    textSecondary: {
      color: COLORS.text.secondary,
      fontSize: FONT_SIZES.lg,
    },

    textSmall: {
      fontSize: FONT_SIZES.sm,
      color: props.color,
    },

    noMargin: {
      margin: 0,
    },

    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },

    cardBody: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: SPACING.md,
    },

    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },

    modalBody: {
      padding: SPACING.md,
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

    tagSmall: {
      fontSize: FONT_SIZES.sm,
      padding: '3px 10px',
      fontWeight: 500,
    },

    avatar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: COLORS.primary,
      color: COLORS.background.white,
      fontWeight: 'bold',
    },

    divider: {
      margin: `${SPACING.md}px 0`,
    },
  }),
);
