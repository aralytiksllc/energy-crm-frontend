import React from 'react';
import { Card, Typography } from 'antd';
import { TaskCard } from '@/components';
import { Task } from '../../tasks/types';
import { useUsers } from '@/pages/users/hooks/useUsers';
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
  const { data: users = [] } = useUsers();

  // Transform users to match the expected User interface
  const transformedUsers = React.useMemo(() => {
    return users.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar || undefined,
    }));
  }, [users]);

  return (
    <Card className={styles.card} hoverable>
      <Title level={5} className={styles.title}>
        {content}
      </Title>
      <Text className={styles.description}>{description}</Text>
      {task && (
        <div className={styles.taskContent}>
          <TaskCard task={task} users={transformedUsers} />
        </div>
      )}
    </Card>
  );
};
