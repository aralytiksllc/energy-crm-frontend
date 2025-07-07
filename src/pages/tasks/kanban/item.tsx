import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useKanbanItemStyles } from './item.styles';

export const KanbanItem = ({
  id,
  data,
  children,
}: {
  id: string;
  data?: any;
  children: React.ReactNode;
}) => {
  const { setNodeRef, listeners, attributes, isDragging, transform } =
    useDraggable({
      id,
      data,
    });

  const { styles } = useKanbanItemStyles({ isDragging, transform });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={styles.item}
    >
      {children}
    </div>
  );
};
