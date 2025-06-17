import * as React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useDroppable } from '@dnd-kit/core';

import { KanbanList } from '@/components/kanban';
import type { KanbanColumnProps } from '@/components/kanban';
import type { Stage, Task } from '../types';

import { KanbanCard } from './kanban-card';
import { KanbanCardSkeleton } from './kanban-card.skeleton';
import { useKanbanColumnStyles } from './kanban-column.styles';
import { CreateTaskModal } from './create-task-modal';

export function KanbanColumn(props: KanbanColumnProps<Stage>) {
  const { data, loading = false } = props;
  const { styles, cx } = useKanbanColumnStyles();
  const { isOver, setNodeRef } = useDroppable({ id: data.id });
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const header = (
    <div className={styles.header}>
      <Space className={styles.headerLeft}>
        <span className={styles.title}>{data.name}</span>
        {!!data.tasks?.length && (
          <span className={styles.badge}>{data.tasks.length}</span>
        )}
      </Space>
      <Button
        size="large"
        shape="circle"
        icon={<PlusOutlined style={{ fontSize: 20 }} />}
        type="default"
        className={styles.addBtn}
        onClick={() => setIsCreateModalOpen(true)}
        aria-label="Add new card"
      />
    </div>
  );

  const cardsLoading = loading || !data.tasks;

  const renderItem = React.useCallback(
    (task: Task) => <KanbanCard task={task} />,
    [],
  );

  const keyExtractor = React.useCallback((task: Task) => task.id, []);

  return (
    <>
      <div
        ref={setNodeRef}
        className={cx(styles.root, { [styles.isOver]: isOver })}
      >
        {header}

        {cardsLoading ? (
          <div style={{ padding: 16 }}>
            <KanbanCardSkeleton />
            <KanbanCardSkeleton />
            <KanbanCardSkeleton />
          </div>
        ) : (
          <KanbanList
            items={data.tasks || []}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            header={null}
            footer={null}
          />
        )}
      </div>

      <CreateTaskModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        stageId={data.id}
        projectId={data.projectId}
      />
    </>
  );
}
