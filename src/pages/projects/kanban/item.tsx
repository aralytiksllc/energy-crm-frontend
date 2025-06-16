import React from 'react';
import {
  DragOverlay,
  useDraggable,
  type UseDraggableArguments,
} from '@dnd-kit/core';
import styles from '../styles/kanbanItem.module.css';

interface Props {
  id: string;
  data?: UseDraggableArguments['data'];
}

export const KanbanItem = ({
  children,
  id,
  data,
}: React.PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id,
    data,
  });

  const isActive = !!active && active.id === id;

  return (
    <div className={styles.outer}>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={styles.inner}
        style={{ opacity: active ? (active.id === id ? 1 : 0.5) : 1 }}
      >
        {children}
      </div>
      {isActive && (
        <DragOverlay zIndex={1000}>
          <div className={styles.overlay}>{children}</div>
        </DragOverlay>
      )}
    </div>
  );
};
