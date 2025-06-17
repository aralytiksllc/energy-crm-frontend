import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  kanbanBoard: css`
    display: flex;
    gap: 12px;
    height: 85vh;

    min-height: 400px;
    max-height: 85vh;
    overflow-x: auto;
    align-items: stretch;
    justify-content: flex-start;

    /* thin, neutral scroll bar */
    scrollbar-width: thin;
    selectors: {
      '::-webkit-scrollbar': {
        height: 10px;
        background: transparent;
      }
      '::-webkit-scrollbar-thumb': {
        border-radius: 6px;
      }
    }
  `,

  boardOuter: css`
    width: 100%;
    height: 85vh;
    display: flex;
  `,

  boardInner: css`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 32px;
    overflow: hidden;
  `,

  column: css`
    display: flex;
    flex-direction: column;
    width: 260px;
    margin: 8px;
    border-radius: 10px;
    min-height: 75vh;
  `,

  body: css`
    flex: 1;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: ${token.colorBgContainer};
  `,

  items: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
    align-items: center;
  `,

  footer: css`
    padding: 8px 16px;
    font-size: 14px;
    color: ${token.colorTextSecondary};
    border-top: 1px solid ${token.colorSplit};
    background: ${token.colorBgElevated};
  `,

  kanbanColumn: css`
    width: 260px;
    min-width: 260px;
    max-width: 260px;
    height: 95%;
    margin-top: 12px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid ${token.colorBorder};
    border-radius: 14px;
    transition:
      box-shadow 0.2s,
      border 0.2s;
    background: ${token.colorBgContainer};
  `,

  kanbanColumnOver: css`
    border: 2px dashed ${token.colorPrimary};
    box-shadow: 0 0 0 2px ${token.colorPrimary};
  `,

  kanbanColumnHeader: css`
    padding: 10px 16px 8px;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.5px;
    border-bottom: 1px solid ${token.colorSplit};
  `,

  kanbanColumnHeaderContent: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  kanbanColumnHeaderTitle: css`
    font-weight: 600;
    font-size: 16px;
  `,

  kanbanColumnHeaderBadge: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    border-radius: 50%;
    font-weight: 700;
    font-size: 11px;
    background: ${token.colorBgElevated};
    color: ${token.colorText};
    box-shadow: ${token.boxShadowSecondary};
  `,

  kanbanColumnBody: css`
    flex: 1;
    padding: 8px 8px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    max-height: 100%;

    scrollbar-width: thin;
    selectors: {
      '::-webkit-scrollbar': {
        width: 8px;
        background: transparent;
      }
      '::-webkit-scrollbar-thumb': {
        border-radius: 6px;
      }
    }
  `,

  kanbanColumnEmpty: css`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: italic;
    text-align: center;
  `,

  kanbanItem: css`
    margin: 6px 0;
    width: 100%;
    max-width: 220px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
    transition:
      opacity 0.2s,
      box-shadow 0.2s,
      border 0.2s;
  `,

  kanbanItemDragging: css`
    opacity: 0.5;
    z-index: 1000;
  `,
}));
