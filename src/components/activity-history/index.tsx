import React from 'react';
import { Timeline, Typography, Avatar, Space, Tag } from 'antd';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useActivityHistoryStyles } from './activity-history.styles';

const { Text } = Typography;

export interface ActivityItem {
  id: string;
  action: string;
  description: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  type:
    | 'created'
    | 'updated'
    | 'assigned'
    | 'commented'
    | 'attached'
    | 'status_changed';
}

export interface ActivityHistoryProps {
  activities?: ActivityItem[];
  loading?: boolean;
}

export const ActivityHistory: React.FC<ActivityHistoryProps> = ({
  activities = [],
  loading = false,
}) => {
  const { styles } = useActivityHistoryStyles();

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'created':
        return 'green';
      case 'updated':
        return 'blue';
      case 'assigned':
        return 'orange';
      case 'commented':
        return 'purple';
      case 'attached':
        return 'cyan';
      case 'status_changed':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    return <ClockCircleOutlined className={styles.timelineIcon} />;
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return timestamp.toLocaleDateString();
  };

  const mockActivities: ActivityItem[] =
    activities.length > 0
      ? activities
      : [
          {
            id: '1',
            action: 'created',
            description: 'Task was created',
            user: { id: 1, name: 'John Doe', avatar: undefined },
            timestamp: new Date(Date.now() - 86400000),
            type: 'created',
          },
          {
            id: '2',
            action: 'assigned',
            description: 'Assigned to Jane Smith',
            user: { id: 2, name: 'Project Manager', avatar: undefined },
            timestamp: new Date(Date.now() - 43200000),
            type: 'assigned',
          },
          {
            id: '3',
            action: 'commented',
            description: 'Added a comment: "Please review the requirements"',
            user: { id: 3, name: 'Jane Smith', avatar: undefined },
            timestamp: new Date(Date.now() - 21600000),
            type: 'commented',
          },
          {
            id: '4',
            action: 'attached',
            description: 'Uploaded document: requirements.pdf',
            user: { id: 1, name: 'John Doe', avatar: undefined },
            timestamp: new Date(Date.now() - 7200000),
            type: 'attached',
          },
          {
            id: '5',
            action: 'status_changed',
            description: 'Status changed from "To Do" to "In Progress"',
            user: { id: 3, name: 'Jane Smith', avatar: undefined },
            timestamp: new Date(Date.now() - 3600000),
            type: 'status_changed',
          },
        ];

  return (
    <div className={styles.container}>
      <Timeline
        className={styles.timeline}
        items={mockActivities.map((activity) => ({
          dot: getActivityIcon(activity.type),
          color: getActivityColor(activity.type),
          children: (
            <div className={styles.activityItem}>
              <Space
                direction="vertical"
                size={4}
                className={styles.activityContent}
              >
                <Space align="center" className={styles.activityHeader}>
                  <Avatar
                    size="small"
                    src={activity.user.avatar}
                    icon={<UserOutlined />}
                    className={styles.userAvatar}
                  />
                  <Text strong className={styles.userName}>
                    {activity.user.name}
                  </Text>
                  <Tag
                    color={getActivityColor(activity.type)}
                    className={styles.actionTag}
                  >
                    {activity.action}
                  </Tag>
                  <Text type="secondary" className={styles.timestamp}>
                    {formatTimestamp(activity.timestamp)}
                  </Text>
                </Space>
                <Text className={styles.description}>
                  {activity.description}
                </Text>
              </Space>
            </div>
          ),
        }))}
      />

      {mockActivities.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <Text type="secondary">No activity history available</Text>
        </div>
      )}
    </div>
  );
};
