import { createStyles } from 'antd-style';

export const useExpandableCardStyles = createStyles(({ token }) => ({
  card: {
    marginBottom: '16px',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  contentContainer: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  avatar: {
    alignSelf: 'flex-start',
    flexShrink: 0,
  },
  content: {
    flex: 1,
  },
  toggleText: {
    fontSize: '12px',
    cursor: 'pointer',
    marginTop: '4px',
    color: token.colorPrimary,
    display: 'block',
  },
  collapseText: {
    fontSize: '12px',
    cursor: 'pointer',
    color: token.colorPrimary,
  },
}));
