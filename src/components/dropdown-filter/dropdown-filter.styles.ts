import { createStyles } from 'antd-style';

export const useDropdownFilterStyles = createStyles(
  ({ css }, props: { width: number }) => ({
    select: css`
      width: ${props.width}px;
    `,
  }),
);
