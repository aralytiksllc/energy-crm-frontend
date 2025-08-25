// External
import { createStyles } from 'antd-style';

// Internal

export const useStyles = createStyles((theme) => {
  const { token } = theme;

  return {
    sectionHeader: {
      paddingInline: token.paddingXS,
      marginTop: token.marginXS,
    },
    sectionTitle: {
      fontSize: 12,
      color: token.colorTextSecondary,
      display: 'block',
      lineHeight: '20px',
    },
    menu: {
      borderInlineEnd: 0,
    },
  };
});
