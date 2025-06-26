import { createStyles as createAntdStyles } from 'antd-style';

export const createStyles = createAntdStyles(({ token }) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: token.marginMD,
  },
  searchInput: {
    width: 300,
  },
}));
