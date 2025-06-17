import { createStyles } from 'antd-style';

export const useKanbanColumnStyles = createStyles(({ css }) => ({
  root: css`
    display: flex;
    flex-direction: column;
    width: 300px;
    background: var(--color-bg-container);
    border-radius: var(--border-radius);
    position: relative;
    margin: 0 12px;
    padding: 10px;
    min-height: 120px;
    box-shadow: var(--color-column-shadow);
    border: 1.5px solid var(--color-card-border);
    transition:
      border 0.2s,
      box-shadow 0.2s;
  `,

  header: css`
    padding: 16px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: none;
    background: transparent;
    min-height: 40px;
  `,

  headerLeft: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  title: css`
    font-weight: 700;
    font-size: 15px;
    text-transform: uppercase;
    color: var(--color-text-primary);
    letter-spacing: 0.5px;
  `,

  badge: css`
    border-radius: 9999px;
    font-size: 13px;
    padding: 2px 8px;
    line-height: 1;
    background: var(--color-badge-bg);
    color: var(--color-badge-text);
    font-weight: 600;
    margin-left: 4px;
  `,

  addBtn: css`
    background: var(--color-card-bg);
    border: 1.5px solid var(--color-card-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    color: var(--color-plus-icon) !important;
    transition:
      background 0.2s,
      color 0.2s,
      border 0.2s;
    &:hover {
      background: var(--color-card-bg);
      color: var(--color-primary) !important;
      border-color: var(--color-primary);
    }
    svg {
      color: inherit !important;
    }
  `,

  isOver: css`
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border: 2px dashed var(--color-primary);
      border-radius: var(--border-radius);
      background-image: repeating-radial-gradient(
        var(--color-primary) 1.5px,
        transparent 2.5px,
        transparent 8px
      );
      background-size: 12px 12px;
      opacity: 0.4;
      pointer-events: none;
      z-index: 1;
    }
  `,
}));
