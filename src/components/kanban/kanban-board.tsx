import * as React from 'react';
import type { KanbanBoardProps } from './kanban-board.types';
import { KanbanColumn } from './kanban-column';

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useStyles } from './kanban-board.styles';

const sensorOptions = { activationConstraint: { distance: 5 } };

export function KanbanBoard<T>({
  sections,
  keyExtractor,
  renderItem,
  renderColumnHeader,
  onDragEnd,
}: KanbanBoardProps<T> & { onDragEnd?: (event: DragEndEvent) => void }) {
  const { styles } = useStyles();

  const mouseSensor = useSensor(MouseSensor, sensorOptions);

  const touchSensor = useSensor(TouchSensor, sensorOptions);

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      if (event.over === null) return;
      if (onDragEnd) onDragEnd(event);
    },
    [onDragEnd],
  );

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {sections.map((section) => (
            <KanbanColumn
              key={section.id}
              section={section}
              renderItem={renderItem}
              renderHeader={renderColumnHeader}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
