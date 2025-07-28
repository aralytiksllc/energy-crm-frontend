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

const PriorityIcon: React.FC<{ priority: 'high' | 'medium' | 'low' }> = ({
  priority,
}) => {
  const iconColor = getPriorityColor(priority);
  const { styles } = useDeadlineTrackerStyles({ iconColor });

  switch (priority) {
    case 'high':
      return <ExclamationCircleOutlined className={styles.icon} />;
    case 'medium':
      return <ClockCircleOutlined className={styles.icon} />;
    case 'low':
      return <CalendarOutlined className={styles.icon} />;
    default:
      return <CalendarOutlined className={styles.icon} />;
  }
};

const isOverdue = (dueDate: string): boolean => {
  return dayjs(dueDate).isBefore(dayjs(), 'day');
};

const DeadlineItem: React.FC<{ deadline: DeadlineInfo }> = ({ deadline }) => {
  const overdue = isOverdue(deadline.dueDate);
  const priorityColor = getPriorityColor(deadline.priority);
  const { styles } = useDeadlineTrackerStyles({ overdue, priorityColor });
  const dueDate = dayjs(deadline.dueDate);
  const relativeTimeStr = dueDate.fromNow();

  return (
    <List.Item className={styles.listItem}>
      <div className={styles.fullWidth}>
        <div className={styles.itemContainer}>
          <div className={styles.itemContent}>
            <div className={styles.itemHeader}>
              <PriorityIcon priority={deadline.priority} />
              <Text strong className={styles.title}>
                {deadline.title}
              </Text>
              <Tag color={deadline.type === 'task' ? 'blue' : 'green'}>
                {deadline.type}
              </Tag>
            </div>
            {deadline.projectName && (
              <Text type="secondary" className={styles.projectName}>
                {deadline.projectName}
              </Text>
            )}
          </div>
          <div className={styles.itemRight}>
            <Tooltip title={dueDate.format('MMM DD, YYYY')}>
              <Text className={styles.dueDate}>
                {overdue ? 'Overdue' : relativeTimeStr}
              </Text>
            </Tooltip>
            <div>
              <Tag className={styles.priorityTag}>
                {deadline.priority.toUpperCase()}
              </Tag>
            </div>
          </div>
        </div>
      </div>
    </List.Item>
  );
};

export const DeadlineTracker: React.FC<DeadlineTrackerProps> = ({
  deadlines,
  title = 'Upcoming Deadlines',
}) => {
  const { styles } = useDeadlineTrackerStyles({});

  if (deadlines.length === 0) {
    return (
      <Card title={title} className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.emptyContainer}>
            <Empty
              description="No upcoming deadlines"
              className={styles.empty}
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
            renderItem={(deadline) => <DeadlineItem deadline={deadline} />}
          />
        </div>
      </div>
    </Card>
  );
};
