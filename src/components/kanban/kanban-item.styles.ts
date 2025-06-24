import { createStyles } from 'antd-style';

export const useKanbanItemStyles = createStyles(() => ({
  root: {
    position: 'relative',
    margin: '6px 0',
    width: '100%',
    maxWidth: 220,
    borderRadius: 8,
    transition: 'opacity 0.2s, z-index 0.2s, box-shadow 0.2s, border 0.2s',
    cursor: 'grab',
    background: 'inherit',
    padding: '5px',
  },
  dragging: {
    opacity: 1,
    zIndex: 1000,
    boxShadow:
      '0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08)',
    cursor: 'grabbing',
  },

  dragging2: {
    opacity: 0.5,
  },
}));
