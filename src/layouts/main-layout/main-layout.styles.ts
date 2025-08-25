// External
import { createStyles } from 'antd-style';

// Internal

export const useStyles = createStyles((theme) => {
  const { token } = theme;

  return {
    root: {
      backgroundColor: token.colorBgLayout,
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      overflow: 'hidden',
      width: '100%',
    },

    right: {
      backgroundColor: token.colorBgLayout,
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      minHeight: 0,
      minWidth: 0,
    },

    sidebar: {
      backgroundColor: token.colorBgContainer,
      borderRight: `1px solid ${token.colorSplit}`,
      flex: '0 0 auto',
      overflow: 'auto',
    },

    header: {
      backgroundColor: token.colorBgElevated,
      borderBottom: `1px solid ${token.colorSplit}`,
      flex: '0 0 auto',
      height: 64,
      lineHeight: '64px',
      paddingLeft: 0,
      paddingRight: 0,
    },

    content: {
      flex: '1 1 auto',
      minHeight: 0,
      minWidth: 0,
      overflow: 'auto',
      backgroundColor: token.colorBgLayout,
      display: 'flex',
      flexDirection: 'column',
    },

    button: {
      fontSize: '16px',
      width: 64,
      height: 64,
    },
  };
});
