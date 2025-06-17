import * as React from 'react';
import { Avatar, Tooltip } from 'antd';
import type { Task } from '../types';
import { useKanbanCardStyles } from './kanban-card.styles'; // your existing style file

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {
  const { styles } =
    useKanbanCardStyles(); /* style names come from the file you sent */

  return (
    <div className={styles.card}>
      <div className={styles.title}>{task.title}</div>
      {task.description && (
        <div className={styles.description}>{task.description}</div>
      )}

      <div className={styles.meta}>
        <span>{task.dueDate.toLocaleDateString()}</span>

        <div className={styles.avatars}>
          {task.assignedTo.map((u) => (
            <Tooltip key={u.id} title={u.name}>
              <Avatar size="small" src={u.avatar}>
                {u.name[0]}
              </Avatar>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};
