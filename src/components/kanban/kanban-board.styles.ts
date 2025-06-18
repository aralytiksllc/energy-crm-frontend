import { createStyles } from 'antd-style';

export const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    height: 'calc(100vh - 64px)',
    justifyContent: 'column',
    margin: '-32px',
    width: 'calc(100% + 64px)',
  },
  body: {
    display: 'flex',
    height: '100%',
    overflow: 'scroll',
    padding: '32px',
    width: '100%',
  },
}));
