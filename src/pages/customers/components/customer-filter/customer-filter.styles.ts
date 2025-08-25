// External
import { createStyles } from 'antd-style';

// Internal

export const useStyles = createStyles((theme) => {
  const { token } = theme;

  return {
    filter: {
      borderBottom: `1px solid ${token.colorSplit}`,
      padding: `${token.padding}px ${token.padding}px`,
      flex: '0 0 auto',
    },
  };
});
