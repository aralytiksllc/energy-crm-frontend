// External
import { createStyles } from 'antd-style';

// Internal

export const useStyles = createStyles((theme) => {
  const { token } = theme;

  return {
    root: {
      background: token.colorBgLayout,
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    },

    content: {
      background: token.colorBgContainer,
      flex: '1 1 auto',
      minWidth: 0,
      overflow: 'auto',
      padding: '32px',
    },
  };
});
