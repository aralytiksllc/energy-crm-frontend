import { createStyles } from 'antd-style';

export const useCardStyles = createStyles(({ css }) => ({
  moreOutlined: css`
    transform: 'rotate(90deg)';
  `,
  cardContent: css`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 8px;
    width: 300px;
  `,
  dueDateIcon: css`
    font-size: 12px;
  `,
  dueDateTag: css`
    padding: 0 4px;
    margin-inline-end: 0;
  `,
  assigneeSpace: css`
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    margin-right: 0;
  `,
  avatarGroup: css`
    color: black;
    background-color: #fff7e6;
    font-weight: 400;
  `,
  avatar: css`
    background-color: #f0f0f0;
    color: black;
    font-weight: 400;
  `,
}));
