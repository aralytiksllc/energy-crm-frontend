// External imports
import * as React from 'react';

// Internal imports
import { KanbanBoard } from '@/components/kanban';
import { KanbanColumn } from './components/kanban-column';
import { Stage } from './types';

export const stages: Stage[] = [
  { id: 'lead', name: 'Lead', ticketCount: 3 },
  { id: 'qualified', name: 'Qualified', ticketCount: 5 },
  { id: 'proposal', name: 'Proposal', ticketCount: 2 },
  { id: 'negotiation', name: 'Negotiation', ticketCount: 1 },
  { id: 'closed-won', name: 'Closed Won', ticketCount: 7 },
  { id: 'closed-lost', name: 'Closed Lost', ticketCount: 4 },
];

export const TasksList: React.FC = () => {

  const keyExtractor = React.useCallback((item: Stage) => item.id, []);

  return (
    <KanbanBoard
      columns={stages}
      keyExtractor={keyExtractor}
      onDragEnd={() => {}}
      ColumnComponent={KanbanColumn}
    />
  );
};
