import * as React from 'react';
import {
  DragOverlay,
  useDraggable,
  type UseDraggableArguments,
} from '@dnd-kit/core';
import { useKanbanItemStyles } from './kanban-item.styles';

interface KanbanItemProps<T> {
  children?: React.ReactNode;
  id: string | number;
  data: T;
}

export function KanbanItem<T>(props: KanbanItemProps<T>) {
  const { id, data, children } = props;
  const { styles } = useKanbanItemStyles();

  const { setNodeRef, attributes, listeners, active } = useDraggable({
    id,
    data: data as UseDraggableArguments['data'],
  });

  const isActive = active?.id === id;

  return (
    <div className={styles.root}>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={isActive ? styles.dragging : undefined}
      >
        {children}
      </div>
      {isActive && (
        <DragOverlay zIndex={1000}>
          <div className={styles.dragging}>{children}</div>
        </DragOverlay>
      )}
    </div>
  );
}
