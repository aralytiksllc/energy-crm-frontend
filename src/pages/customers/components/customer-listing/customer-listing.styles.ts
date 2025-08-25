// External
import { createStyles } from 'antd-style';

// Internal

export const useStyles = createStyles((theme) => {
  const { token } = theme;

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      width: '100%',
    },

    header: {
      borderBottom: `1px solid ${token.colorSplit}`,
      flex: '0 0 auto',
      padding: `${token.padding}px ${token.padding}px`,
    },

    content: {
      flex: '1 1 auto',
      minHeight: 0,
      minWidth: 0,
      overflow: 'auto',
    },
  };
});
