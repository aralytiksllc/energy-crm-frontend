import React, { useMemo, useState } from 'react';
import { Row, Col, Card, Space, Typography, DatePicker, Select } from 'antd';
import { IUser, IPlanning, IProject, ICustomer, Task } from '@interfaces/index';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import {
  getDateRangeFromFilter,
  filterDataByDateRange,
  calculateDashboardStats,
  processClientHours,
  processProjectHours,
  calculateLegacyTicketStats,
  calculateTicketStats,
  getUpcomingDeadlines,
  calculateProductivityMetrics,
  type TicketStats,
  type DeadlineInfo,
  type ProductivityMetrics,
} from '../utils';
import { useMockDashboardTrends } from '../hooks/useDashboardTrends';
import { ManagerStatsCards } from './ManagerStatsCards';
import { ClientHoursPieChart } from './ClientHoursPieChart';
import { ProjectHoursBarChart } from './ProjectHoursBarChart';
import { LegacyTicketStats } from './LegacyTicketStats';
import { useUserDashboardStyles } from './user-dashboard.styles';

dayjs.extend(isBetween);

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface UserDashboardProps {
  currentUser?: IUser;
  plannings?: IPlanning[];
  tasks?: Task[];
  projects?: IProject[];
  customers?: ICustomer[];
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentUser,
  plannings,
  tasks,
  projects,
  customers,
}) => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [quickFilter, setQuickFilter] = useState<string>('month');

  const allPlannings = plannings || [];
  const allTasks = tasks || [];
  const allProjects = projects || [];
  const allCustomers = customers || [];

  const currentDateRange = useMemo(
    () => getDateRangeFromFilter(quickFilter, dateRange),
    [quickFilter, dateRange],
  );

  const filteredTasks = useMemo(
    () => filterDataByDateRange(allTasks, currentDateRange),
    [allTasks, currentDateRange],
  );

  const userFilteredTasks = filteredTasks;

  const stats = useMemo(
    () => calculateDashboardStats(allCustomers, allProjects, userFilteredTasks),
    [allCustomers, allProjects, userFilteredTasks],
  );

  const hoursByClient = useMemo(
    () => processClientHours(allProjects, allCustomers, userFilteredTasks),
    [allProjects, allCustomers, userFilteredTasks],
  );

  const hoursByProject = useMemo(
    () => processProjectHours(allProjects, userFilteredTasks),
    [allProjects, userFilteredTasks],
  );

  const userHoursByProject = useMemo(() => {
    if (!currentUser?.id) return [];

    // Use userFilteredTasks which already filters by user assignment and date range
    const userTasks = userFilteredTasks;

    const userProjects = allProjects.filter((project) =>
      userTasks.some((task) => task.projectId === project.id),
    );

    return userProjects
      .map((project) => {
        const projectTasks = userTasks.filter(
          (task) => task.projectId === project.id,
        );

        const plannedHours = projectTasks.reduce((total, task) => {
          const userAssignee = task.assignees?.find(
            (assignee) => assignee.userId === Number(currentUser.id),
          );
          return total + (userAssignee?.estimatedHours || 0);
        }, 0);

        const actualHours = projectTasks.reduce((total, task) => {
          const userAssignee = task.assignees?.find(
            (assignee) => assignee.userId === Number(currentUser.id),
          );
          return total + (userAssignee?.actualHours || 0);
        }, 0);

        return {
          name: project.name,
          plannedHours,
          actualHours,
          totalHours: plannedHours + actualHours,
        };
      })
      .filter((item) => item.totalHours > 0)
      .sort((a, b) => b.totalHours - a.totalHours)
      .slice(0, 5);
  }, [allProjects, userFilteredTasks, currentUser?.id]);

  const ticketStats: TicketStats = useMemo(
    () => calculateTicketStats(userFilteredTasks, Number(currentUser?.id)),
    [userFilteredTasks, currentUser],
  );

  const legacyStats = useMemo(
    () => calculateLegacyTicketStats(userFilteredTasks),
    [userFilteredTasks],
  );

  const upcomingDeadlines: DeadlineInfo[] = useMemo(
    () =>
      getUpcomingDeadlines(
        userFilteredTasks,
        allProjects,
        Number(currentUser?.id),
      ),
    [userFilteredTasks, allProjects, currentUser?.id],
  );

  const productivityMetrics: ProductivityMetrics = useMemo(() => {
    if (!currentUser?.id)
      return {
        completionRate: 0,
        taskCompletionRate: 0,
        totalUserTasks: 0,
        completedTasks: 0,
        overdueTasks: 0,
        thisWeekTasks: 0,
        mostActiveProject: { name: 'N/A', hours: 0 },
      };
    return calculateProductivityMetrics(
      userFilteredTasks,
      allProjects,
      Number(currentUser.id),
    );
  }, [userFilteredTasks, allProjects, currentUser?.id]);

  const managerTrends = useMockDashboardTrends();

  const handleQuickFilterChange = (value: string) => {
    setQuickFilter(value);
    if (value !== 'custom') {
      setDateRange(null);
    }
  };

  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates ? [dates[0], dates[1]] : null);
    setQuickFilter('custom');
  };

  const { styles } = useUserDashboardStyles();

  const renderProductivityReport = () => {
    const { plannedHours, workedHours } = stats;
    const percent =
      plannedHours > 0 ? Math.round((workedHours / plannedHours) * 100) : 0;
    const overworkedProject = hoursByProject.find(
      (p) => p.actualHours > p.plannedHours,
    );
    return (
      <Card title="Kohë reale: Raporti i produktivitetit">
        <Typography.Paragraph>
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
        </Typography.Paragraph>
      </Card>
    );
  };

  return (
    <Space direction="vertical" size="large" className={styles.verticalSpace}>
      <Card>
        <div className={styles.headerRow}>
          <div>
            <Title level={3}>
              Welcome back, {currentUser?.firstName} {currentUser?.lastName}!
            </Title>
            <Text type="secondary">Account</Text>
          </div>
          <div className={styles.controlsSection}>
            <Space size="large">
              <Space align="center">
                <Text strong>Time Period:</Text>
                <Select
                  value={quickFilter}
                  onChange={handleQuickFilterChange}
                  style={{ width: 120 }}
                >
                  <Select.Option value="week">This Week</Select.Option>
                  <Select.Option value="month">This Month</Select.Option>
                  <Select.Option value="quarter">This Quarter</Select.Option>
                  <Select.Option value="year">This Year</Select.Option>
                  <Select.Option value="custom">Custom</Select.Option>
                </Select>
              </Space>
              {quickFilter === 'custom' && (
                <RangePicker
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  format="MMM DD, YYYY"
                />
              )}
            </Space>
          </div>
        </div>
      </Card>

      <ManagerStatsCards
        activePlannings={allPlannings.filter((p) => !p.isCompleted).length}
        totalProjects={stats.totalProjects}
        plannedHours={stats.plannedHours}
        workedHours={stats.workedHours}
        trends={managerTrends}
      />

      <Row gutter={24}>
        <Col span={24}>
          <Row gutter={16}>
            <Col span={10}>
              <ClientHoursPieChart
                data={hoursByClient}
                title="Shpërndarja e orëve për klient"
              />
            </Col>
            <Col span={14}>
              <ProjectHoursBarChart
                data={hoursByProject}
                title="Top 5 projektet sipas orëve të shpenzuara"
              />
            </Col>
          </Row>
          <LegacyTicketStats stats={legacyStats} />
        </Col>
      </Row>
      {renderProductivityReport()}
    </Space>
  );
};

export default UserDashboard;
