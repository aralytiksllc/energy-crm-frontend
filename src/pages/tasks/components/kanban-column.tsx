import * as React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Space } from 'antd';
import { useDroppable } from '@dnd-kit/core';

import { KanbanList } from '@/components/kanban';
import type { KanbanColumnProps } from '@/components/kanban';
import type { Stage, Task } from '../types';

import { KanbanCard } from './kanban-card';
import { KanbanCardSkeleton } from './kanban-card.skeleton';
import { useKanbanColumnStyles } from './kanban-column.styles';
import { CreateTaskModal } from './create-task-modal';

import { ConfigProvider, Typography } from 'antd';

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
    <div
      ref={setNodeRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 16px',
      }}
    >
      <div
        style={{
          padding: '12px',
        }}
      >
        <Space
          style={{
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Space>
            <Typography.Text
              // ellipsis={{ tooltip: title }}
              // size="xs"
              strong
              style={{
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              "title"
            </Typography.Text>
            {!!1 && <Badge count={1} color="cyan" />}
          </Space>
          <Button shape="circle" icon={<PlusOutlined />} onClick={() => {}} />
        </Space>
        {'description'}
      </div>
      <div
        style={{
          flex: 1,
          overflowY: isOver ? 'unset' : 'auto',
          border: '2px dashed transparent',
          borderColor: isOver ? '#00000040' : 'red',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <KanbanList
            items={data.tasks || []}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            header={null}
            footer={null}
          />
        </div>
      </div>
    </div>
  );

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
