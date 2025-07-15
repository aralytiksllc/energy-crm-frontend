import React from 'react';
import { Card, Row, Col, Statistic, Progress, Typography, Space } from 'antd';
import {
  BugOutlined,
  ToolOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CodeOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  ReloadOutlined,
  TeamOutlined,
  CloudServerOutlined,
  SearchOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { TicketStats } from '../../pages/dashboard/utils';
import { useTicketStatsStyles } from './ticket-stats.styles';

const { Text } = Typography;

interface TicketStatsProps {
  stats: TicketStats;
  title?: string;
}

const TaskTypeIcon: React.FC<{ type: string }> = ({ type }) => {
  const iconColorMap: Record<string, string> = {
    FEATURE: '#1890ff',
    BUG: '#ff4d4f',
    CODE_REVIEW: '#722ed1',
    TESTING: '#fa8c16',
    DOCUMENTATION: '#52c41a',
    REFACTOR: '#13c2c2',
    MEETING: '#eb2f96',
    DEPLOYMENT: '#fa541c',
    RESEARCH: '#2f54eb',
    OTHER: '#8c8c8c',
  };
  const iconColor = iconColorMap[type] || '#52c41a';
  const { styles } = useTicketStatsStyles({ iconColor });

  const icons: Record<string, React.ReactNode> = {
    FEATURE: <RocketOutlined className={styles.icon} />,
    BUG: <BugOutlined className={styles.icon} />,
    CODE_REVIEW: <CodeOutlined className={styles.icon} />,
    TESTING: <ExperimentOutlined className={styles.icon} />,
    DOCUMENTATION: <FileTextOutlined className={styles.icon} />,
    REFACTOR: <ReloadOutlined className={styles.icon} />,
    MEETING: <TeamOutlined className={styles.icon} />,
    DEPLOYMENT: <CloudServerOutlined className={styles.icon} />,
    RESEARCH: <SearchOutlined className={styles.icon} />,
    OTHER: <MoreOutlined className={styles.icon} />,
  };

  return <>{icons[type] || <ToolOutlined className={styles.icon} />}</>;
};

const formatTaskTypeName = (type: string) => {
  return type
    .replace('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

const Stat: React.FC<{
  title: string;
  value: number;
  prefix: React.ReactNode;
  color: string;
}> = ({ title, value, prefix, color }) => {
  return (
    <Statistic
      title={title}
      value={value}
      prefix={prefix}
      valueStyle={{ color }}
    />
  );
};

export const TicketStatsCard: React.FC<TicketStatsProps> = ({
  stats,
  title = 'Task Overview',
}) => {
  const { styles } = useTicketStatsStyles({});
  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const taskTypes = [
    'FEATURE',
    'BUG',
    'CODE_REVIEW',
    'TESTING',
    'DOCUMENTATION',
    'REFACTOR',
    'MEETING',
    'DEPLOYMENT',
    'RESEARCH',
    'OTHER',
  ];

  return (
    <Card title={title} className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.contentContainer}>
          <Space direction="vertical" className={styles.fullWidth} size="large">
            <Row gutter={16}>
              <Col span={8}>
                <Stat
                  title="Total Tasks"
                  value={stats.total}
                  prefix={<ToolOutlined />}
                  color="#1890ff"
                />
              </Col>
              <Col span={8}>
                <Stat
                  title="Completed"
                  value={stats.completed}
                  prefix={<CheckCircleOutlined />}
                  color="#52c41a"
                />
              </Col>
              <Col span={8}>
                <Stat
                  title="Overdue"
                  value={stats.overdue}
                  prefix={<ExclamationCircleOutlined />}
                  color="#ff4d4f"
                />
              </Col>
            </Row>
            <div>
              <div className={styles.progressHeader}>
                <Text strong>Completion Progress</Text>
              </div>
              <Progress
                percent={completionRate}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                status={completionRate === 100 ? 'success' : 'active'}
              />
            </div>
            <div className={styles.taskTypeGrid}>
              <Text strong className={styles.taskTypeHeader}>
                Task Type Breakdown
              </Text>
              <Row gutter={[8, 8]}>
                {taskTypes.map((type) => {
                  const count = stats[type as keyof TicketStats] as number;
                  if (count === 0) return null;

                  return (
                    <Col span={8} key={type}>
                      <div className={styles.taskTypeItem}>
                        <TaskTypeIcon type={type} />
                        <div className={styles.taskTypeContent}>
                          <div className={styles.taskTypeCount}>{count}</div>
                          <div className={styles.taskTypeName}>
                            {formatTaskTypeName(type)}
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
              {taskTypes.every(
                (type) => (stats[type as keyof TicketStats] as number) === 0,
              ) && <div className={styles.emptyState}>No tasks available</div>}
            </div>
          </Space>
        </div>
      </div>
    </Card>
  );
};
