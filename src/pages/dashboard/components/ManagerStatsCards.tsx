import React from 'react';
import { Row, Col, Card, Statistic, Space } from 'antd';
import {
  CalendarOutlined,
  ProjectOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {
  getTrendIcon,
  getTrendColor,
  type TrendData,
} from '../../../utils/trend-utils';

interface ManagerStatsCardsProps {
  activePlannings: number;
  totalProjects: number;
  plannedHours: number;
  workedHours: number;
  trends?: {
    plannings: TrendData;
    projects: TrendData;
    plannedHours: TrendData;
    workedHours: TrendData;
  };
}

export const ManagerStatsCards: React.FC<ManagerStatsCardsProps> = ({
  activePlannings,
  totalProjects,
  plannedHours,
  workedHours,
  trends,
}) => {
  const getStatTrendIcon = (trendData?: TrendData) => {
    if (!trendData) return null;
    const IconComponent = getTrendIcon(trendData.trend);
    return React.createElement(IconComponent);
  };

  const getStatTrendColor = (trendData?: TrendData, isPositiveGood = true) => {
    if (!trendData) return '#3f8600';
    return getTrendColor(trendData.trend, { isPositiveGood });
  };
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card variant="outlined">
          <Space>
            <CalendarOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Statistic
              title="Active Plannings"
              value={activePlannings}
              valueStyle={{ color: getStatTrendColor(trends?.plannings) }}
              prefix={getStatTrendIcon(trends?.plannings)}
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
              valueStyle={{ color: getStatTrendColor(trends?.projects) }}
              prefix={getStatTrendIcon(trends?.projects)}
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
              valueStyle={{ color: getStatTrendColor(trends?.plannedHours) }}
              prefix={getStatTrendIcon(trends?.plannedHours)}
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
              valueStyle={{ color: getStatTrendColor(trends?.workedHours) }}
              prefix={getStatTrendIcon(trends?.workedHours)}
            />
          </Space>
        </Card>
      </Col>
    </Row>
  );
};
