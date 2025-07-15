import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { KanbanSection } from './kanban-board.types';
import { KanbanItem } from './kanban-item';
import { useKanbanColumnStyles } from './kanban-column.styles';

interface KanbanColumnProps<T> {
  section: KanbanSection<T>;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderHeader: (section: KanbanSection<T>) => React.ReactNode;
}

export function KanbanColumn<T>({
  section,
  renderItem,
  renderHeader,
}: KanbanColumnProps<T>) {
  const { setNodeRef, isOver } = useDroppable({ id: section.id });
  const { styles } = useKanbanColumnStyles({ isOver });

  return (
    <div ref={setNodeRef} className={styles.container}>
      <div className={styles.header}>{renderHeader(section)}</div>

      <div className={styles.content}>
        {section.items.map((item: any, index) => (
          <KanbanItem key={item.id} id={item.id} data={item}>
            {renderItem(item, index)}
          </KanbanItem>
        ))}
      </div>
    </div>
  );
}
