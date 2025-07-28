import React, { useMemo } from 'react';
import { Row, Col, Typography } from 'antd';
import { IUser, IPlanning, IProject, ICustomer, Task } from '@interfaces/index';

import {
  calculateDashboardStats,
  processClientHours,
  processProjectHours,
  calculateLegacyTicketStats,
} from '../utils';
import { useDateFilter } from '../hooks/use-date-filter';
import { useMockDashboardTrends } from '../hooks/useDashboardTrends';
import { DashboardLayout } from './common';
import { ManagerStatsCards } from './cards/ManagerStatsCards';
import { LegacyTicketStats } from './cards/LegacyTicketStats';
import { ClientHoursPieChart, ProjectHoursBarChart } from './charts';
import { useManagerDashboardStyles } from './manager-dashboard.styles';

const { Text } = Typography;

interface ManagerDashboardProps {
  currentUser?: IUser;
  plannings?: IPlanning[];
  tasks?: Task[];
  projects?: IProject[];
  customers?: ICustomer[];
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({
  currentUser,
  plannings,
  tasks,
  projects,
  customers,
}) => {
  const { styles } = useManagerDashboardStyles();
  const allPlannings = plannings || [];
  const allTasks = tasks || [];
  const allProjects = projects || [];
  const allCustomers = customers || [];

  const {
    quickFilter,
    dateRange,
    filteredData: filteredTasks,
    handleQuickFilterChange,
    handleDateRangeChange,
  } = useDateFilter(allTasks);

  const stats = useMemo(
    () => calculateDashboardStats(allCustomers, allProjects, filteredTasks),
    [allCustomers, allProjects, filteredTasks],
  );

  const hoursByClient = useMemo(
    () => processClientHours(allProjects, allCustomers, filteredTasks),
    [allProjects, allCustomers, filteredTasks],
  );

  const hoursByProject = useMemo(
    () => processProjectHours(allProjects, filteredTasks),
    [allProjects, filteredTasks],
  );

  const legacyStats = useMemo(
    () => calculateLegacyTicketStats(filteredTasks),
    [filteredTasks],
  );

  const managerTrends = useMockDashboardTrends();

  const renderProductivityReport = () => {
    const { plannedHours, workedHours } = stats;
    const percent =
      plannedHours > 0 ? Math.round((workedHours / plannedHours) * 100) : 0;
    const overworkedProject = hoursByProject.find(
      (p) => p.actualHours > p.plannedHours,
    );
    return (
      <div className={styles.productivityReportContainer}>
        <Text>
          Në këtë periudhë janë kryer <strong>{percent}%</strong> e orëve të
          planifikuara.
          {percent >= 100 ? ' Ekipi ka tejkaluar pritshmëritë!' : null}
          <br />
          <br />
          {overworkedProject ? (
            <>
              <strong>Rekomandim:</strong> Rishiko prioritetet për projektin{' '}
              <strong>{overworkedProject.name}</strong>, ku janë alokuar më
              shumë orë ({overworkedProject.actualHours}) se sa është
              planifikuar ({overworkedProject.plannedHours}).
            </>
          ) : (
            <>
              <strong>Rekomandim:</strong> Ekipi po performon mirë në të gjitha
              projektet.
            </>
          )}
        </Text>
      </div>
    );
  };

  return (
    <DashboardLayout
      currentUser={currentUser}
      dashboardType="manager"
      quickFilter={quickFilter}
      dateRange={dateRange}
      onQuickFilterChange={handleQuickFilterChange}
      onDateRangeChange={handleDateRangeChange}
    >
      <ManagerStatsCards
        activePlannings={allPlannings.filter((p) => !p.isCompleted).length}
        totalProjects={stats.totalProjects}
        plannedHours={stats.plannedHours}
        workedHours={stats.workedHours}
        trends={managerTrends}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <ClientHoursPieChart data={hoursByClient} title="Hours by Client" />
        </Col>
        <Col xs={24} md={12}>
          <ProjectHoursBarChart
            data={hoursByProject}
            title="Hours by Project"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={24}>
          <LegacyTicketStats stats={legacyStats} />
        </Col>
        <Col xs={24} lg={24}>
          <div className={styles.productivityCard}>
            <Text strong className={styles.productivityTitle}>
              Kohë reale: Raporti i produktivitetit
            </Text>
            {renderProductivityReport()}
          </div>
        </Col>
      </Row>
    </DashboardLayout>
  );
};
