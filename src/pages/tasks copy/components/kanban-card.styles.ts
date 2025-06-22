import { createStyles } from 'antd-style';

export const useStyles = createStyles(() => ({
  card: {},
  body: {
    width: '100%',
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagContainer: {
    flex: 1,
    overflow: 'hidden',
    marginRight: 10,
  },
  ellipsisTag: {
    display: 'inline-block',
    maxWidth: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    verticalAlign: 'middle',
    margin: 0,
  },

  paragraph: {
    marginBottom: '0 !important',
  },
}));
