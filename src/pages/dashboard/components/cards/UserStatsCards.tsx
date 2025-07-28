import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import {
  ClockCircleOutlined,
  ProjectOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { useDashboardStyles } from '../../dashboard.styles';

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
  const { styles } = useDashboardStyles();
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card>
          <Statistic
            title="My Active Tasks"
            value={activeTasks}
            className={styles.statValuePrimary}
            prefix={<ClockCircleOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="My Projects"
            value={projectCount}
            className={styles.statValueSuccess}
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
            className={
              completionRate >= 80
                ? styles.statValueSuccess
                : completionRate >= 60
                  ? styles.statIconWarning
                  : styles.iconCyan
            }
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
            className={styles.statValueTesting}
            prefix={<ClockCircleOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};
