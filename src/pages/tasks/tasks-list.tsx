import * as React from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { KanbanBoard } from '@/components/kanban';
import { KanbanColumn } from './components/kanban-column';
import { Stage, Task } from './types';
import { useUpdateTask, useTasks } from './hooks';
import { Spin, Alert } from 'antd';

export const TasksList: React.FC = () => {
  const { data: tasksData, isLoading, error } = useTasks();
  const { mutate: updateTask } = useUpdateTask();

  const keyExtractor = React.useCallback((s: Stage) => s.id, []);

  // Organize tasks into stages based on completion status and other criteria
  const stages: Stage[] = React.useMemo(() => {
    if (!tasksData?.items) {
      return [
        {
          id: 'todo',
          name: 'To Do',
          ticketCount: 0,
          projectId: 1, // Default project ID, can be dynamic later
          tasks: [],
        },
        {
          id: 'in-progress',
          name: 'In Progress',
          ticketCount: 0,
          projectId: 1,
          tasks: [],
        },
        {
          id: 'done',
          name: 'Done',
          ticketCount: 0,
          projectId: 1,
          tasks: [],
        },
      ];
    }

    const tasks = tasksData.items;

    // Add a status field to tasks to track their stage
    // For now, we'll use a simple logic:
    // - Tasks without due date or recently created = To Do
    // - Tasks with due date and not completed = In Progress
    // - Completed tasks = Done

    const todoTasks = tasks.filter((task) => {
      return !task.isCompleted && !task.dueDate;
    });

    const inProgressTasks = tasks.filter((task) => {
      return !task.isCompleted && task.dueDate;
    });

    const doneTasks = tasks.filter((task) => task.isCompleted);

    return [
      {
        id: 'todo',
        name: 'To Do',
        ticketCount: todoTasks.length,
        projectId: 1,
        tasks: todoTasks,
      },
      {
        id: 'in-progress',
        name: 'In Progress',
        ticketCount: inProgressTasks.length,
        projectId: 1,
        tasks: inProgressTasks,
      },
      {
        id: 'done',
        name: 'Done',
        ticketCount: doneTasks.length,
        projectId: 1,
        tasks: doneTasks,
      },
    ];
  }, [tasksData]);

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const taskId = Number(active.id);
        const newStageId = String(over.id);

        // Find the current task to get its current state
        const currentTask = tasksData?.items.find((task) => task.id === taskId);
        if (!currentTask) return;

        // Update task based on stage
        let updateData: any = {};

        if (newStageId === 'done') {
          updateData = {
            isCompleted: true,
            completedDate: new Date().toISOString(),
          };
        } else if (newStageId === 'in-progress') {
          updateData = {
            isCompleted: false,
            completedDate: null,
            // Ensure it has a due date to be in progress
            dueDate:
              currentTask.dueDate ||
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Default to 1 week from now
          };
        } else if (newStageId === 'todo') {
          updateData = {
            isCompleted: false,
            completedDate: null,
            dueDate: null, // Remove due date to put in todo
          };
        }

        updateTask({
          id: taskId,
          data: updateData,
        });
      }
    },
    [updateTask, tasksData],
  );

  if (error) {
    return (
      <Alert
        message="Error loading tasks"
        description="Failed to load tasks from the server. Please try again."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <Spin spinning={isLoading}>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            padding: '16px',
            minWidth: 'fit-content',
          }}
        >
          <KanbanBoard
            columns={stages}
            keyExtractor={keyExtractor}
            onDragEnd={handleDragEnd}
            ColumnComponent={KanbanColumn}
            loadingColumns={stages.map(() => isLoading)}
          />
        </div>
      </Spin>
    </div>
  );
};

export default TasksList;
