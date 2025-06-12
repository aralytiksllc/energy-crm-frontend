// External imports
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

// Internal imports
import styles from '../styles/kanbanBoard.module.css';

interface DroppableColumnProps {
  id: string;
  children: React.ReactNode;
  isOver: boolean;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  children,
  isOver,
}) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={
        styles['kanban-column'] +
        (isOver ? ' ' + styles['kanban-column--over'] : '')
      }
    >
      {children}
    </div>
  );
};

export default DroppableColumn;
