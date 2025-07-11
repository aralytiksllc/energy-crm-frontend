import React from 'react';
import { Row, Col, Card, Statistic, Space } from 'antd';
import {
  CalendarOutlined,
  ProjectOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

interface ManagerStatsCardsProps {
  activePlannings: number;
  totalProjects: number;
  plannedHours: number;
  workedHours: number;
}

export const ManagerStatsCards: React.FC<ManagerStatsCardsProps> = ({
  activePlannings,
  totalProjects,
  plannedHours,
  workedHours,
}) => {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card variant="outlined">
          <Space>
            <CalendarOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Statistic
              title="Active Plannings"
              value={activePlannings}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Space>
        </Card>
      </Col>

      <Col span={6}>
        <Card variant="outlined">
          <Space>
            <ProjectOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
            <Statistic
              title="Active Projects"
              value={totalProjects}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Space>
        </Card>
      </Col>

      <Col span={6}>
        <Card variant="outlined">
          <Space>
            <ClockCircleOutlined
              style={{ fontSize: '24px', color: '#faad14' }}
            />
            <Statistic
              title="Planned Hours"
              value={plannedHours}
              suffix="h"
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Space>
        </Card>
      </Col>

      <Col span={6}>
        <Card variant="outlined">
          <Space>
            <CheckCircleOutlined
              style={{ fontSize: '24px', color: '#13c2c2' }}
            />
            <Statistic
              title="Hours Worked"
              value={workedHours}
              suffix="h"
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
            />
          </Space>
        </Card>
      </Col>
    </Row>
  );
};
