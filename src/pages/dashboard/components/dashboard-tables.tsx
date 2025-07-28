import React from 'react';
import { Row, Col } from 'antd';
import type { DashboardTablesProps } from '../types/dashboard-tables.types';
import { useDashboardTables } from '../hooks/use-dashboard-tables';
import { useDashboardTablesStyles } from './dashboard-tables.styles';
import { LatestLeadsCard, UpcomingTasksCard } from './cards';

const DashboardTables: React.FC<DashboardTablesProps> = ({ tasks }) => {
  const { styles } = useDashboardTablesStyles();
  const { latestLeads, upcomingTasks } = useDashboardTables(tasks);

  return (
    <Row gutter={[24, 24]} className={styles.container}>
      <Col span={12}>
        <LatestLeadsCard leads={latestLeads} />
      </Col>
      <Col span={12}>
        <UpcomingTasksCard tasks={upcomingTasks} />
      </Col>
    </Row>
  );
};

export default DashboardTables;
