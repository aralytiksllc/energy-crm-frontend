import React from 'react';
import { createStyles } from 'antd-style';

export const useProjectMemberManagerStyles = createStyles(({ css, token }) => ({
  container: css`
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
    padding: 16px;
    background-color: ${token.colorBgLayout};
    margin-bottom: 16px;
  `,
  header: css`
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${token.colorSplit};
  `,
  memberRow: css`
    margin-bottom: 8px;
  `,
  fullWidth: css`
    width: 100%;
  `,
  removeButtonCol: css`
    text-align: center;
  `,
  addButton: css`
    padding-left: 0;
    margin-top: 8px;
  `,
}));
