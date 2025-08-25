// External
import { createStyles } from 'antd-style';

// Internal

export const useStyles = createStyles((theme) => {
  const { token } = theme;
  return {
    root: {
      height: '100%',
    },
    itemWrap: {
      marginBottom: token.paddingSM,
    },
    emptyWrap: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: token.padding,
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: token.paddingSM,
    },
  };
});
