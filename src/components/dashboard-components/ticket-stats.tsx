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

const getTaskTypeIcon = (type: string) => {
  switch (type) {
    case 'FEATURE':
      return <RocketOutlined style={{ color: '#1890ff' }} />;
    case 'BUG':
      return <BugOutlined style={{ color: '#ff4d4f' }} />;
    case 'CODE_REVIEW':
      return <CodeOutlined style={{ color: '#722ed1' }} />;
    case 'TESTING':
      return <ExperimentOutlined style={{ color: '#fa8c16' }} />;
    case 'DOCUMENTATION':
      return <FileTextOutlined style={{ color: '#52c41a' }} />;
    case 'REFACTOR':
      return <ReloadOutlined style={{ color: '#13c2c2' }} />;
    case 'MEETING':
      return <TeamOutlined style={{ color: '#eb2f96' }} />;
    case 'DEPLOYMENT':
      return <CloudServerOutlined style={{ color: '#fa541c' }} />;
    case 'RESEARCH':
      return <SearchOutlined style={{ color: '#2f54eb' }} />;
    case 'OTHER':
      return <MoreOutlined style={{ color: '#8c8c8c' }} />;
    default:
      return <ToolOutlined style={{ color: '#52c41a' }} />;
  }
};

const formatTaskTypeName = (type: string) => {
  return type
    .replace('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

export const TicketStatsCard: React.FC<TicketStatsProps> = ({
  stats,
  title = 'Task Overview',
}) => {
  const { styles } = useTicketStatsStyles();
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
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Total Tasks"
                  value={stats.total}
                  prefix={<ToolOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Completed"
                  value={stats.completed}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Overdue"
                  value={stats.overdue}
                  prefix={<ExclamationCircleOutlined />}
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Col>
            </Row>
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
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
              <Text strong style={{ marginBottom: '12px', display: 'block' }}>
                Task Type Breakdown
              </Text>
              <Row gutter={[8, 8]}>
                {taskTypes.map((type) => {
                  const count = stats[type as keyof TicketStats] as number;
                  if (count === 0) return null;

                  return (
                    <Col span={8} key={type}>
                      <div className={styles.taskTypeItem}>
                        {getTaskTypeIcon(type)}
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
