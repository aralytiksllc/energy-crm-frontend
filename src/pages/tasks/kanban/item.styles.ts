import { createStyles } from 'antd-style';
import type { Transform } from '@dnd-kit/utilities';

export const useKanbanItemStyles = createStyles(
  (
    { css },
    {
      isDragging,
      transform,
    }: { isDragging: boolean; transform: Transform | null },
  ) => {
    const item = css`
      opacity: ${isDragging ? 0.3 : 1};
      transform: ${transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : 'none'};
      transition: none;
      animation: none;
      ${isDragging &&
      css`
        opacity: 0.3;
        pointer-events: none;
      `}
    `;

    return {
      item,
    };
  },
);
