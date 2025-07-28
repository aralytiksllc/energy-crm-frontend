import React from 'react';
import { Typography, Tag, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import type { TaskCardProps } from '../../types/dashboard-tables.types';
import { useDashboardTablesStyles } from '../dashboard-tables.styles';

const { Text } = Typography;

const TaskCard: React.FC<TaskCardProps> = ({ task, isLast }) => {
  const { styles } = useDashboardTablesStyles();

  return (
    <div
      className={`${styles.taskItem} ${!isLast ? styles.taskItemBorder : ''}`}
    >
      <div className={styles.taskItemLeft}>
        <Text strong className={styles.taskName}>
          {task.name}
        </Text>
        <Space className={styles.taskDateContainer}>
          <CalendarOutlined className={styles.calendarIcon} />
          <Text className={styles.taskDate}>{task.dueDate}</Text>
        </Space>
      </div>
      <div className={styles.taskItemRight}>
        <Text className={styles.taskPriority}>NA</Text>
        <Tag color="orange" className={styles.taskTag}>
          {task.status}
        </Tag>
      </div>
    </div>
  );
};

export default TaskCard;
