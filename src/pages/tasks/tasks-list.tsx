import * as React from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { KanbanBoard } from '@/components/kanban';
import { KanbanColumn } from './components/kanban-column';
import { Stage, Task, TaskType } from './types';
import { useUpdateTask } from './hooks/useUpdateTask';

const mockUser = { id: 1, name: 'Demo', avatar: '' };
const base = (id: string, title: string): Task => ({
  id: Number(id),
  title,
  description: 'Demo description',
  type: TaskType.OTHER,
  isCompleted: false,
  dueDate: new Date(),
  project: { id: 1, name: 'Demo' },
  assignedTo: [mockUser],
  createdBy: mockUser,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const stages: Stage[] = [
  {
    id: 'todo',
    name: 'To Do',
    ticketCount: 2,
    projectId: 1,
    tasks: [base('1', 'Task 1'), base('2', 'Task 2')],
  },
  {
    id: 'in-progress',
    name: 'In Progress',
    ticketCount: 1,
    projectId: 1,
    tasks: [base('3', 'Task 3')],
  },
  {
    id: 'done',
    name: 'Done',
    ticketCount: 1,
    projectId: 1,
    tasks: [base('4', 'Task 4')],
  },
];

export const TasksList: React.FC = () => {
  const keyExtractor = React.useCallback((s: Stage) => s.id, []);
  const { mutate: updateTask } = useUpdateTask();

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        updateTask({
          taskId: Number(active.id),
          stageId: String(over.id),
        });
      }
    },
    [updateTask],
  );

  return (
    <KanbanBoard
      columns={stages}
      keyExtractor={keyExtractor}
      onDragEnd={handleDragEnd}
      ColumnComponent={KanbanColumn}
      loadingColumns={stages.map((s) => !s.tasks)}
    />
  );
};

export default TasksList;
