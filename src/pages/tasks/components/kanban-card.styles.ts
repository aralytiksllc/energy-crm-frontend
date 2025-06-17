import { createStyles } from 'antd-style';

export const useKanbanCardStyles = createStyles(({ css }) => ({
  card: css`
    padding: 16px 18px 12px 18px;
    border-radius: 10px;
    background: white;
    border: 0.05rem solid var(--color-card-border);
    box-shadow: var(--color-card-shadow);
    margin-bottom: 12px;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    transition:
      box-shadow 0.2s,
      border 0.2s;
  `,

  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  `,

  title: css`
    font-weight: 700;
    font-size: 16px;
    color: black;
    margin-bottom: 2px;
  `,

  description: css`
    font-size: 14px;
    color: black;
    margin-bottom: 2px;
  `,

  meta: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    margin-top: 4px;
  `,

  avatars: css`
    display: flex;
    gap: 4px;
  `,
}));
