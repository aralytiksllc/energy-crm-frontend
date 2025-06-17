import * as React from 'react';
import { KanbanList } from '@/components/kanban';
import type { KanbanColumnProps } from '@/components/kanban';
import { type Stage, type Task, TaskType } from '../types';

const mockUser = {
  id: 1,
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?img=1',
};

const projectA = { id: 1, name: 'Project A' };

const items: Task[] = [
  {
    id: 1,
    title: 'Initial Client Contact',
    type: TaskType.EMAIL,
    isCompleted: false,
    description: 'Send welcome email and gather initial requirements',
    dueDate: new Date('2024-03-20'),
    project: projectA,
    assignedTo: [mockUser],
    createdBy: mockUser,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function KanbanColumn(props: KanbanColumnProps<Stage>) {
  const { index, data } = props;



  const renderItem = React.useCallback(
    (item: Task) => <div>Render Card</div>,
    [],
  );

  const keyExtractor = React.useCallback((item: Task) => item.id, []);






  const header = (
    <div>
      {data.name} ({data.ticketCount})
    </div>
  );

  const footer = <div>is loading</div>;

  return (
    <KanbanList
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      header={header}
      footer={footer}
      items={items}
    />
  );
}
