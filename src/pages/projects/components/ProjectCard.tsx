import React from 'react';
import { Card, Typography, Avatar, Space, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Task } from '../../tasks/types';
import styles from '../styles/projectCard.module.css';

const { Title, Text } = Typography;

interface ProjectCardProps {
  id: string;
  content: string;
  description: string;
  task?: Task;
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

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
          <div className={styles.taskHeader}>
            <Text strong>{task.title}</Text>
          </div>
          <Text type="secondary" className={styles.taskDescription}>
            {task.description}
          </Text>
          <Space size="middle" className={styles.taskMeta}>
            <Text type="secondary">{formatDate(task.dueDate)}</Text>
            <Space size={4}>
              {task.assignedTo?.map((user) => (
                <Tooltip key={user.id} title={user.name}>
                  <Avatar
                    size="small"
                    src={user.avatar}
                    icon={!user.avatar && <UserOutlined />}
                    className={styles.avatar}
                  />
                </Tooltip>
              ))}
            </Space>
          </Space>
        </div>
      )}
    </Card>
  );
};
