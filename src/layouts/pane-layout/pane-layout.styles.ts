// External
import { createStyles } from 'antd-style';

// Internal

export const useStyles = createStyles((theme) => {
  const { token } = theme;

  return {
    root: {
      // background: token.colorBgLayout,
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    },

    sider: {
      background: token.colorBgContainer,
      borderRight: `1px solid ${token.colorSplit}`,
      flex: '0 0 auto',
      overflow: 'auto',
    },

    content: {
      // background: token.colorBgContainer,
      flex: '1 1 auto',
      minWidth: 0,
      overflow: 'auto',

      background: 'white',
      // padding: '32px',
    },
  };
});
