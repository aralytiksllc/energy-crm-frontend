// External
import { createStyles } from 'antd-style';

// Internal

export const useStyles = createStyles((theme) => {
  const { token } = theme;

  return {
    input: {
      width: '100%',
    },

    inputNumber: {
      width: '100%',
    },
  };
});
