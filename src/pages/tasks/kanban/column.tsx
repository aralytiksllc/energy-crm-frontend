import React from 'react';
import { useDroppable, type UseDroppableArguments } from '@dnd-kit/core';
import { Badge, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useKanbanColumnStyles } from './column.styles';

type Props = {
  id: string;
  title: string;
  description?: React.ReactNode;
  count: number;
  data?: UseDroppableArguments['data'];
  onAddClick?: (args: { id: string }) => void;
};

export const KanbanColumn = ({
  children,
  id,
  title,
  description,
  count,
  data,
  onAddClick,
}: React.PropsWithChildren<Props>) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
  });

  const { styles } = useKanbanColumnStyles({ isOver, active: !!active });

  const onAddClickHandler = () => {
    onAddClick?.({ id });
  };

  return (
    <div ref={setNodeRef} className={styles.container}>
      <div className={styles.header}>
        <Space className={styles.headerSpace}>
          <Space>
            <span className={styles.title}>{title}</span>
            {!!count && <Badge count={count} color="cyan" />}
          </Space>
          {onAddClick && (
            <Button
              shape="circle"
              icon={<PlusOutlined />}
              onClick={onAddClickHandler}
            />
          )}
        </Space>
        {description}
      </div>
      <div className={styles.content}>
        <div className={styles.itemContainer}>{children}</div>
      </div>
    </div>
  );
};
