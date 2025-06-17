import * as React from 'react';
import {
  DragOverlay,
  useDraggable,
  type UseDraggableArguments,
} from '@dnd-kit/core';
import styles from '../styles/kanbanItem.module.css';

interface KanbanItemProps<T> {
  children?: React.ReactNode;
  id: string | number;
  data: T;
}


export function KanbanItem<T>(props: KanbanItemProps<T>) {
  const { id, data, children } = props;

  const { setNodeRef, attributes, listeners, active } = useDraggable({
    id,
    data: data as UseDraggableArguments['data'],
  });

  const isActive = active?.id === id;
  const opacity = active ? (isActive ? 1 : 0.5) : 1;

  return (
    <div className={styles.outer}>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={styles.inner}
        style={{ opacity }}
      >
        {children}
      </div>

      {isActive && (
        <DragOverlay zIndex={1000}>
          <div className={styles.overlay}>{children}</div>
        </DragOverlay>
      )}
    </div>
  )
}
