// External imports
import { createStyles } from 'antd-style';

// Internal imports

export const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  tag: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    margin: 0,
  },
}));
