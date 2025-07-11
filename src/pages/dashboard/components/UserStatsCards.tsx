import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import {
  ClockCircleOutlined,
  ProjectOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';

interface UserStatsCardsProps {
  activeTasks: number;
  projectCount: number;
  completionRate: number;
  plannedHours: number;
}

export const UserStatsCards: React.FC<UserStatsCardsProps> = ({
  activeTasks,
  projectCount,
  completionRate,
  plannedHours,
}) => {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card>
          <Statistic
            title="My Active Tasks"
            value={activeTasks}
            valueStyle={{ color: '#1890ff' }}
            prefix={<ClockCircleOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="My Projects"
            value={projectCount}
            valueStyle={{ color: '#52c41a' }}
            prefix={<ProjectOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Completion Rate"
            value={completionRate}
            suffix="%"
            valueStyle={{
              color:
                completionRate >= 80
                  ? '#52c41a'
                  : completionRate >= 60
                    ? '#faad14'
                    : '#ff4d4f',
            }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Planned Hours"
            value={plannedHours}
            suffix="h"
            valueStyle={{ color: '#722ed1' }}
            prefix={<ClockCircleOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};
