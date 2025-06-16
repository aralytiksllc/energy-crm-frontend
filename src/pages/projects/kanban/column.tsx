import React from 'react';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { useDroppable, type UseDroppableArguments } from '@dnd-kit/core';
import { Badge, Button, Skeleton, Space, Typography } from 'antd';
import styles from '../styles/kanbanColumn.module.css';
import { getColumnClass, getBodyClass } from '../utils/kanbanColumnHelpers';

const { Text } = Typography;

type Props = {
  id: string;
  title: string;
  description?: React.ReactNode;
  count: number;
  data?: UseDroppableArguments['data'];
  onAddClick?: (args: { id: string }) => void;
};

export const KanbanColumn: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  id,
  title,
  description,
  count,
  data,
  onAddClick,
}) => {
  const { isOver, setNodeRef, active } = useDroppable({ id, data });

  const onAddClickHandler = () => {
    onAddClick?.({ id });
  };

  return (
    <div ref={setNodeRef} className={getColumnClass(isOver)}>
      <div className={styles.header}>
        <Space className={styles.headerSpace}>
          <Space className={styles.headerLeft}>
            <Text ellipsis={{ tooltip: title }} className={styles.title}>
              {title}
            </Text>
            {!!count && <Badge count={count} color="cyan" />}
          </Space>
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAddClickHandler}
          />
        </Space>
        {description}
      </div>
      <div className={getBodyClass(isOver, active)}>
        <div className={styles.items}>{children}</div>
      </div>
    </div>
  );
};

export const KanbanColumnSkeleton: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <div className={styles.column}>
    <div className={styles.header}>
      <Space className={styles.headerSpace}>
        <Skeleton.Button size="small" className={styles.skeletonBtn} />
        <Button
          disabled
          type="text"
          shape="circle"
          icon={<MoreOutlined style={{ transform: 'rotate(90deg)' }} />}
        />
        <Button disabled shape="circle" icon={<PlusOutlined />} />
      </Space>
    </div>
    <div className={styles.body}>
      <div className={styles.items}>{children}</div>
    </div>
  </div>
);
