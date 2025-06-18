import * as React from 'react';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import type { KanbanBoardProps } from './kanban-board.types';
import { useStyles } from './kanban-board.styles';

const sensorOptions = { activationConstraint: { distance: 5 } };

export const KanbanBoard = <T,>(props: KanbanBoardProps<T>) => {
  const { columns, keyExtractor, onDragEnd, ColumnComponent, loadingColumns } =
    props;

  const { styles } = useStyles();

  const mouseSensor = useSensor(MouseSensor, sensorOptions);

  const touchSensor = useSensor(TouchSensor, sensorOptions);

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      if (event.over === null) return;
      onDragEnd(event);
    },
    [onDragEnd],
  );

  const renderColumn = React.useCallback(
    (column: T, index: number) => (
      <ColumnComponent
        key={keyExtractor(column)}
        data={column}
        index={index}
        loading={false}
      />
    ),
    [ColumnComponent, keyExtractor],
  );

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {columns.map(renderColumn)}
        </DndContext>
      </div>
    </div>
  );
};
