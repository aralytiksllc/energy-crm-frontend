// External
import { createStyles } from 'antd-style';

// Internal

export const useStyles = createStyles((theme) => {
  const { token, css } = theme;

  return {
    base: css({
      borderRadius: token.borderRadiusLG,
      cursor: 'pointer',
      transition:
        'background-color .18s ease, border-color .18s ease, box-shadow .18s ease, transform .06s ease',

      ':hover': {
        backgroundColor: token.colorPrimaryBgHover,
        borderColor: token.colorPrimary,
        boxShadow: token.boxShadowSecondary,
      },

      ':active': {
        transform: 'translateY(1px)',
      },

      '.ant-card-body': {
        padding: `${token.paddingSM}px ${token.padding}px`,
      },

      ':focus-visible': {
        boxShadow: `0 0 0 3px ${token.colorPrimaryBorder}`,
        outline: 0,
      },
    }),

    active: css({
      backgroundColor: token.colorPrimaryBg,
      borderColor: token.colorPrimary,
    }),

    row: css({
      alignItems: 'center',
      display: 'flex',
      gap: 12,
      width: '100%',
    }),

    avatar: css({
      flex: '0 0 auto',
    }),

    body: css({
      display: 'grid',
      flex: '1 1 auto',
      gap: 4,
      minWidth: 0,
    }),

    topRow: css({
      alignItems: 'center',
      display: 'flex',
      gap: 8,
      justifyContent: 'space-between',
      minWidth: 0,
    }),

    bottomRow: css({
      display: 'flex',
      minWidth: 0,
    }),

    company: css({
      display: 'inline-block',
      maxWidth: '100%',
    }),

    tag: css({
      border: `1px solid ${token.colorBorderSecondary}`,
      marginRight: 0,
      marginTop: 0,
    }),

    business: css({
      fontSize: token.fontSizeSM,
      lineHeight: token.lineHeightSM,
    }),

    icon: css({
      alignItems: 'center',
      color: token.colorTextTertiary,
      display: 'flex',
      flex: '0 0 auto',
      justifyContent: 'center',
    }),
  };
});
