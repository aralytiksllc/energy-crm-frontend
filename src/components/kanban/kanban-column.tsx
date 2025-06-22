import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { KanbanSection } from './kanban-board.types';
import { KanbanItem } from './kanban-item';

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

  return (
    <div
      ref={setNodeRef}
      style={{
        background: '#f0f2f5',
        borderRadius: 8,
        minWidth: 260,
        padding: 12,
        border: isOver ? '2px dashed #1677ff' : '2px solid transparent',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: 8 }}>{renderHeader(section)}</div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          overflowY: 'auto',
          flex: 1,
        }}
      >
        {section.items.map((item: any, index) => (
          <KanbanItem key={item.id} id={item.id} data={item}>
            {renderItem(item, index)}
          </KanbanItem>
        ))}
      </div>
    </div>
  );
}
