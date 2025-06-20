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

  const header = (
    <div className={styles.header}>
      <Space className={styles.headerLeft}>
        <span className={styles.title}>{data.name}</span>
        {!!data.tasks?.length && (
          <span className={styles.badge}>{data.tasks.length}</span>
        )}
      </Space>
      <CreateTaskModal stageId={data.id} buttonStyle={{ fontSize: 20 }} />
    </div>
  );

  const cardsLoading = loading || !data.tasks;

  const renderItem = React.useCallback(
    (task: Task) => <KanbanCard key={task.id} task={task} />,
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
              strong
              style={{
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {data.name}
            </Typography.Text>
            {!!data.tasks?.length && (
              <Badge count={data.tasks.length} color="cyan" />
            )}
          </Space>
          <CreateTaskModal stageId={data.id} buttonStyle={{ fontSize: 20 }} />
        </Space>
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
}
