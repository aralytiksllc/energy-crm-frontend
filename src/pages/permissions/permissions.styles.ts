import { createStyles } from 'antd-style';

export const usePermissionsMatrixStyles = createStyles(({ css }) => ({
  permissionCell: css`
    cursor: default;
  `,
  permissionCellClickable: css`
    cursor: pointer;
  `,
  descriptionParagraph: css`
    margin: 0;
    font-size: 12px;
  `,
}));
