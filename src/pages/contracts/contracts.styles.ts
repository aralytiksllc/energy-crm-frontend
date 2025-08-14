import { createStyles } from 'antd-style';

export const useContractsStyles = createStyles(({ token }) => ({
  table: {
    '.ant-table-thead > tr > th': {
      backgroundColor: token.colorBgContainer,
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
      fontWeight: 600,
    },
    '.ant-table-tbody > tr > td': {
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
    },
    '.ant-table-tbody > tr:hover > td': {
      backgroundColor: token.colorBgTextHover,
    },
  },
}));
