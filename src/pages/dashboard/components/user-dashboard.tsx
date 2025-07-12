import React, { useMemo, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Space,
  Typography,
  Spin,
  DatePicker,
  Select,
} from 'antd';
import { useList, useGetIdentity } from '@refinedev/core';
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
import {
  DeadlineTracker,
  TicketStatsCard,
} from '../../../components/dashboard-components';
import { ManagerStatsCards } from './ManagerStatsCards';
import { UserStatsCards } from './UserStatsCards';
import { ClientHoursPieChart } from './ClientHoursPieChart';
import { ProjectHoursBarChart } from './ProjectHoursBarChart';
import { LegacyTicketStats } from './LegacyTicketStats';
import { useUserDashboardStyles } from './user-dashboard.styles';

dayjs.extend(isBetween);

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export const UserDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [quickFilter, setQuickFilter] = useState<string>('month');

  const { data: currentUser, isLoading: userLoading } = useGetIdentity<IUser>();

  const { data: planningsData, isLoading: planningsLoading } =
    useList<IPlanning>({ resource: 'plannings', pagination: { mode: 'off' } });
  const { data: tasksData, isLoading: tasksLoading } = useList<Task>({
    resource: 'tasks',
    pagination: { mode: 'off' },
  });
  const { data: projectsData, isLoading: projectsLoading } = useList<IProject>({
    resource: 'projects',
    pagination: { mode: 'off' },
  });
  const { data: customersData, isLoading: customersLoading } =
    useList<ICustomer>({
      resource: 'customers',
      pagination: { mode: 'off' },
    });

  const allPlannings = planningsData?.data || [];
  const allTasks = tasksData?.data || [];
  const allProjects = projectsData?.data || [];
  const allCustomers = customersData?.data || [];

  const currentDateRange = useMemo(
    () => getDateRangeFromFilter(quickFilter, dateRange),
    [quickFilter, dateRange],
  );

  const filteredTasks = useMemo(
    () => filterDataByDateRange(allTasks, currentDateRange),
    [allTasks, currentDateRange],
  );

  // For regular users, filter tasks to only show their assigned tasks
  // For managers, show all tasks
  const userFilteredTasks = useMemo(() => {
    if (currentUser?.role?.name === 'manager') {
      return filteredTasks; // Managers see all tasks
    }

    if (!currentUser?.id) {
      return []; // No user logged in
    }

    // Regular users only see their assigned tasks
    return filteredTasks.filter((task) =>
      task.assignees?.some(
        (assignee) => assignee.userId === Number(currentUser.id),
      ),
    );
  }, [filteredTasks, currentUser?.id, currentUser?.role?.name]);

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
    () =>
      calculateTicketStats(
        userFilteredTasks,
        Number(currentUser?.id),
        currentUser?.role?.name === 'manager',
      ),
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

  const isLoading =
    userLoading ||
    planningsLoading ||
    tasksLoading ||
    projectsLoading ||
    customersLoading;

  const { styles } = useUserDashboardStyles();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  const renderProductivityReport = () => {
    if (currentUser?.role?.name === 'manager') {
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
                <strong>Rekomandim:</strong> Ekipi po performon mirë në të
                gjitha projektet.
              </>
            )}
          </Typography.Paragraph>
        </Card>
      );
    }
    return (
      <Card title="Kohë reale: Raporti i produktivitetit personal">
        <Typography.Paragraph>
          {productivityMetrics.totalUserTasks > 0 ? (
            <>
              You have completed{' '}
              <strong>{productivityMetrics.completedTasks}</strong> out of{' '}
              <strong>{productivityMetrics.totalUserTasks}</strong> tasks.
              {productivityMetrics.taskCompletionRate > 80
                ? " Excellent work! You're exceeding expectations."
                : productivityMetrics.taskCompletionRate > 60
                  ? ' Good progress! Keep up the momentum.'
                  : ' Consider prioritizing task completion to improve your efficiency.'}
              <br />
              <br />
              <strong>Your Performance:</strong>
              <ul>
                <li>
                  Most active project:{' '}
                  <strong>
                    {productivityMetrics.mostActiveProject?.name || 'N/A'}
                  </strong>{' '}
                  ({productivityMetrics.mostActiveProject?.hours || 0})
                </li>
                <li>
                  Tasks due this week:{' '}
                  <strong>{productivityMetrics.thisWeekTasks}</strong>
                </li>
                <li>
                  Overdue tasks:{' '}
                  <strong>{productivityMetrics.overdueTasks}</strong>
                </li>
              </ul>
            </>
          ) : (
            <Text>No tasks assigned in the selected period.</Text>
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
            <Text type="secondary">
              {currentUser?.role?.name === 'manager' ? 'Manager' : 'User'}{' '}
              Account
            </Text>
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

      {currentUser?.role?.name === 'manager' ? (
        <ManagerStatsCards
          activePlannings={allPlannings.filter((p) => !p.isCompleted).length}
          totalProjects={stats.totalProjects}
          plannedHours={stats.plannedHours}
          workedHours={stats.workedHours}
          trends={managerTrends}
        />
      ) : (
        <UserStatsCards
          activeTasks={userFilteredTasks.filter((t) => !t.isCompleted).length}
          projectCount={
            [...new Set(userFilteredTasks.map((t) => t.projectId))].length
          }
          completionRate={productivityMetrics.taskCompletionRate}
          plannedHours={userFilteredTasks.reduce((total, task) => {
            const userAssignee = task.assignees?.find(
              (assignee) => assignee.userId === Number(currentUser?.id),
            );
            return total + (userAssignee?.estimatedHours || 0);
          }, 0)}
        />
      )}

      <Row gutter={24}>
        <Col span={24}>
          {currentUser?.role?.name === 'manager' ? (
            <>
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
            </>
          ) : (
            <>
              <Row gutter={16} style={{ alignItems: 'stretch' }}>
                <Col span={14} style={{ display: 'flex' }}>
                  <TicketStatsCard
                    stats={ticketStats}
                    title="My Task Statistics"
                  />
                </Col>
                <Col span={10} style={{ display: 'flex' }}>
                  <DeadlineTracker
                    deadlines={upcomingDeadlines}
                    title="My Upcoming Deadlines"
                  />
                </Col>
              </Row>

              {userHoursByProject.length > 0 && (
                <Row style={{ marginTop: 16 }}>
                  <Col span={24}>
                    <ProjectHoursBarChart
                      data={userHoursByProject}
                      title="My Project Hours"
                    />
                  </Col>
                </Row>
              )}
            </>
          )}
        </Col>
      </Row>
      {renderProductivityReport()}
    </Space>
  );
};

export default UserDashboard;
