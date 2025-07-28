import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  container: {
    width: '100%',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadius,
    marginBottom: token.marginLG,
  },
  header: {
    padding: token.paddingXS,
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
    backgroundColor: token.colorBgLayout,
  },
  headerColumn: {
    color: token.colorTextSecondary,
    fontWeight: 500,
  },
  row: {
    width: '100%',
    padding: token.paddingXS,
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
  },
  formItem: {
    marginBottom: 0,
  },
  inputNumber: {
    width: '100%',
  },
  divider: {
    margin: 0,
  },
  addButton: {
    width: '100%',
    marginTop: 8,
  },
}));
