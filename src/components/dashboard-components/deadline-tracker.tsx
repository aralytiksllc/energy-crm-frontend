import React from 'react';
import { Card, List, Tag, Typography, Empty, Tooltip } from 'antd';
import {
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DeadlineInfo } from '../../pages/dashboard/utils';
import { useDeadlineTrackerStyles } from './deadline-tracker.styles';

dayjs.extend(relativeTime);

const { Text, Title } = Typography;

interface DeadlineTrackerProps {
  deadlines: DeadlineInfo[];
  title?: string;
}

const getPriorityColor = (priority: 'high' | 'medium' | 'low'): string => {
  switch (priority) {
    case 'high':
      return '#ff4d4f';
    case 'medium':
      return '#faad14';
    case 'low':
      return '#52c41a';
    default:
      return '#d9d9d9';
  }
};

const getPriorityIcon = (priority: 'high' | 'medium' | 'low') => {
  switch (priority) {
    case 'high':
      return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
    case 'medium':
      return <ClockCircleOutlined style={{ color: '#faad14' }} />;
    case 'low':
      return <CalendarOutlined style={{ color: '#52c41a' }} />;
    default:
      return <CalendarOutlined style={{ color: '#d9d9d9' }} />;
  }
};

const isOverdue = (dueDate: string): boolean => {
  return dayjs(dueDate).isBefore(dayjs(), 'day');
};

export const DeadlineTracker: React.FC<DeadlineTrackerProps> = ({
  deadlines,
  title = 'Upcoming Deadlines',
}) => {
  const { styles } = useDeadlineTrackerStyles();

  if (deadlines.length === 0) {
    return (
      <Card title={title} className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.emptyContainer}>
            <Empty
              description="No upcoming deadlines"
              style={{ padding: '20px 0' }}
            />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title={title} className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.listContainer}>
          <List
            size="small"
            dataSource={deadlines}
            renderItem={(deadline) => {
              const overdue = isOverdue(deadline.dueDate);
              const dueDate = dayjs(deadline.dueDate);
              const relativeTimeStr = dueDate.fromNow();

              return (
                <List.Item className={styles.listItem}>
                  <div style={{ width: '100%' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <div style={{ flex: 1, marginRight: '8px' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '4px',
                          }}
                        >
                          {getPriorityIcon(deadline.priority)}
                          <Text strong style={{ fontSize: '13px' }}>
                            {deadline.title}
                          </Text>
                          <Tag
                            color={deadline.type === 'task' ? 'blue' : 'green'}
                          >
                            {deadline.type}
                          </Tag>
                        </div>
                        {deadline.projectName && (
                          <Text type="secondary" style={{ fontSize: '11px' }}>
                            {deadline.projectName}
                          </Text>
                        )}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <Tooltip title={dueDate.format('MMM DD, YYYY')}>
                          <Text
                            style={{
                              fontSize: '11px',
                              color: overdue ? '#ff4d4f' : '#666',
                              fontWeight: overdue ? 'bold' : 'normal',
                            }}
                          >
                            {overdue ? 'Overdue' : relativeTimeStr}
                          </Text>
                        </Tooltip>
                        <div>
                          <Tag
                            color={getPriorityColor(deadline.priority)}
                            style={{ fontSize: '10px', marginTop: '2px' }}
                          >
                            {deadline.priority.toUpperCase()}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </div>
                </List.Item>
              );
            }}
          />
        </div>
      </div>
    </Card>
  );
};
