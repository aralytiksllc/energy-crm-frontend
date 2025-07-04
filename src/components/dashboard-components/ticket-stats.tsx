import React from 'react';
import { Card, Row, Col, Statistic, Progress, Typography, Space } from 'antd';
import {
  BugOutlined,
  ToolOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { TicketStats } from '../../pages/dashboard/utils';

const { Text } = Typography;

interface TicketStatsProps {
  stats: TicketStats;
  title?: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'bugs':
      return <BugOutlined style={{ color: '#ff4d4f' }} />;
    case 'features':
      return <RocketOutlined style={{ color: '#1890ff' }} />;
    case 'tasks':
      return <ToolOutlined style={{ color: '#52c41a' }} />;
    case 'completed':
      return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
    case 'overdue':
      return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
    default:
      return null;
  }
};

export const TicketStatsCard: React.FC<TicketStatsProps> = ({
  stats,
  title = 'Ticket Overview',
}) => {
  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <Card title={title}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Row gutter={16}>
          <Col span={8}>
            <Statistic
              title="Total Tickets"
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
        <div>
          <Text strong style={{ marginBottom: '12px', display: 'block' }}>
            Ticket Breakdown
          </Text>
          <Row gutter={[16, 8]}>
            <Col span={8}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {getTypeIcon('bugs')}
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {stats.bugs}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Bugs</div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {getTypeIcon('features')}
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {stats.features}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Features
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {getTypeIcon('tasks')}
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {stats.tasks}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Tasks</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Space>
    </Card>
  );
};
