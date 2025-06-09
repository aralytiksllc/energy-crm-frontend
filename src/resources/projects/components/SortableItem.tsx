import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from '../types/kanban';
import { ProjectCard } from './ProjectCard';
import styles from '../pages/kanbanBoard.module.css';

interface SortableItemProps extends Item {
  isDragging?: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({
  id,
  content,
  description,
  extra,
  isDragging,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: sortableDragging,
  } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      className={
        styles['kanban-item'] +
        (isDragging || sortableDragging
          ? ' ' + styles['kanban-item--dragging']
          : '')
      }
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
    >
      <ProjectCard title={content} description={description} extra={extra} />
    </div>
  );
};

export default SortableItem;
