import React from 'react';
import { Card, Typography } from 'antd';
import { TaskCard } from '@/components';
import { Task } from '../../tasks/types';
import { MOCK_USERS } from '../../tasks/constants/taskConstants';
import styles from '../styles/projectCard.module.css';

const { Title, Text } = Typography;

interface ProjectCardProps {
  id: string;
  content: string;
  description: string;
  task?: Task;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  content,
  description,
  task,
}) => {
  return (
    <Card className={styles.card} hoverable>
      <Title level={5} className={styles.title}>
        {content}
      </Title>
      <Text className={styles.description}>{description}</Text>
      {task && (
        <div className={styles.taskContent}>
          <TaskCard task={task} users={MOCK_USERS} />
        </div>
      )}
    </Card>
  );
};
