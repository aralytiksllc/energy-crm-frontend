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
} from '../../../../utils/trend-utils';
import { useManagerStatsCardsStyles } from './ManagerStatsCards.styles';

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
  const { styles } = useManagerStatsCardsStyles();
  const getStatTrendIcon = (trendData?: TrendData) => {
    if (!trendData) return null;
    const IconComponent = getTrendIcon(trendData.trend);
    return React.createElement(IconComponent);
  };

  const getStatTrendColorClass = (
    trendData?: TrendData,
    isPositiveGood = true,
  ) => {
    if (!trendData) return styles.statValueTrendUp;
    const color = getTrendColor(trendData.trend, { isPositiveGood });
    return color === 'var(--color-trend-up)'
      ? styles.statValueTrendUp
      : styles.statValueTrendDown;
  };
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card variant="outlined">
          <Space>
            <CalendarOutlined className={styles.calendarIcon} />
            <Statistic
              title="Active Plannings"
              value={activePlannings}
              className={getStatTrendColorClass(trends?.plannings)}
              prefix={getStatTrendIcon(trends?.plannings)}
            />
          </Space>
        </Card>
      </Col>

      <Col span={6}>
        <Card variant="outlined">
          <Space>
            <ProjectOutlined className={styles.projectIcon} />
            <Statistic
              title="Active Projects"
              value={totalProjects}
              className={getStatTrendColorClass(trends?.projects)}
              prefix={getStatTrendIcon(trends?.projects)}
            />
          </Space>
        </Card>
      </Col>

      <Col span={6}>
        <Card variant="outlined">
          <Space>
            <ClockCircleOutlined className={styles.clockIcon} />
            <Statistic
              title="Planned Hours"
              value={plannedHours}
              suffix="h"
              className={getStatTrendColorClass(trends?.plannedHours)}
              prefix={getStatTrendIcon(trends?.plannedHours)}
            />
          </Space>
        </Card>
      </Col>

      <Col span={6}>
        <Card variant="outlined">
          <Space>
            <CheckCircleOutlined className={styles.checkIcon} />
            <Statistic
              title="Hours Worked"
              value={workedHours}
              suffix="h"
              className={getStatTrendColorClass(trends?.workedHours)}
              prefix={getStatTrendIcon(trends?.workedHours)}
            />
          </Space>
        </Card>
      </Col>
    </Row>
  );
};
