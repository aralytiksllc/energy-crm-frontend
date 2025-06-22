// External imports
import React from 'react';
import { CrudTable } from '@/components/crud-table/crud-table';
import _ from 'lodash';

// Internal imports
import { CrudKanban } from '@/components/crud-kanban/crud-table';
import { KanbanSection } from '@/components/kanban/kanban-board.types';
import { TaskForm } from './components/task-form';
import { KanbanCard } from './components/kanban-card';
import { useList } from '@refinedev/core';

export const mockKanbanSections: KanbanSection<any>[] = [
  {
    id: 'todo',
    name: 'To Do',
    items: [
      {
        id: 1,
        title: 'Design login screen',
        status: 'todo',
        description: 'Create layout for login with Ant Design components.',
      },
      {
        id: 2,
        title: 'Write API documentation',
        status: 'todo',
        description: 'Document all available endpoints in Swagger.',
      },
    ],
  },
  {
    id: 'in-progress',
    name: 'In Progress',
    items: [
      {
        id: 3,
        title: 'Implement auth service',
        status: 'in-progress',
        description: 'Use JWT for token-based authentication.',
      },
    ],
  },
  {
    id: 'done',
    name: 'Done',
    items: [
      {
        id: 4,
        title: 'Setup project boilerplate',
        status: 'done',
        description: 'Vite + React + TypeScript configured.',
      },
    ],
  },
];

export const Tasks: React.FC = () => {

  const { data, isLoading } = useList<any>({ resource: 'tasks' });

  const sections =  _(data?.data).groupBy('priority')
  .map((items, status) => ({
    id: status,
    name: _.startCase(status), // p.sh. "in-progress" → "In Progress"
    items,
  }))
  .value();


  console.log(sections);
  
  return (
    <CrudKanban<any>
      resource="tasks"
      sections={sections}
      keyExtractor={(task) => task.id}
      renderItem={(task) => <KanbanCard task={task} />}
      renderColumnHeader={(section) => (
        <div style={{ fontWeight: 'bold' }}>
          {section.name} ({section.items.length})
        </div>
      )}
      FormComponent={TaskForm}
      DetailsComponent={({ record }) => (
        <div>
          <h3>{record.title}</h3>
          <p>{record.description}</p>
        </div>
      )}
      drawerTitles={{
        create: 'New Task',
        edit: 'Edit Task',
        view: 'Task Details',
      }}
    />
  );
};
