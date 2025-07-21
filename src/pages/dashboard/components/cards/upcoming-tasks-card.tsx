import React from 'react';
import { Card, Typography } from 'antd';
import type { UpcomingTasksCardProps } from '../../types/dashboard-tables.types';
import { useDashboardTablesStyles } from '../dashboard-tables.styles';
import TaskCard from './task-card';

const { Title, Text } = Typography;

const UpcomingTasksCard: React.FC<UpcomingTasksCardProps> = ({ tasks }) => {
  const { styles } = useDashboardTablesStyles();

  return (
    <Card className={styles.card}>
      <div className={styles.cardHeader}>
        <Title level={4} className={styles.cardTitle}>
          Upcoming Tasks
        </Title>
        <Text className={styles.cardDescription}>Tasks due soon</Text>
      </div>

      {tasks.length > 0 ? (
        <div>
          {tasks.map((task, index) => (
            <TaskCard
              key={task.key}
              task={task}
              isLast={index === tasks.length - 1}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <Text>No upcoming tasks</Text>
        </div>
      )}
    </Card>
  );
};

export default UpcomingTasksCard;
