import React, { useState } from 'react';
import {
  DndContext,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
} from '@dnd-kit/core';
import { useKanbanBoardStyles } from './board.styles';

// Add a max height to the board container for window fit
export const KanbanBoard = ({
  onDragEnd,
  children,
}: React.PropsWithChildren<{ onDragEnd: (event: DragEndEvent) => void }>) => {
  const [activeTask, setActiveTask] = useState<any>(null);
  const { styles } = useKanbanBoardStyles();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { distance: 5 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = active.data.current;
    setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    // Immediately clear the active task to prevent animation
    setActiveTask(null);

    if (event.over === null) return;

    // Call the parent's onDragEnd handler
    onDragEnd(event);
  };

  return (
    <KanbanBoardContainer>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div className={styles.container}>{children}</div>
      </DndContext>
    </KanbanBoardContainer>
  );
};

export const KanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
  const { styles } = useKanbanBoardStyles();
  return <div className={styles.boardContainer}>{children}</div>;
};
