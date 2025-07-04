import React, { useMemo, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Space,
  Typography,
  Spin,
  Switch,
  DatePicker,
  Select,
} from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
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
import {
  DeadlineTracker,
  TicketStatsCard,
} from '../../../components/dashboard-components';
import { ManagerStatsCards } from './ManagerStatsCards';
import { UserStatsCards } from './UserStatsCards';
import { ClientHoursPieChart } from './ClientHoursPieChart';
import { ProjectHoursBarChart } from './ProjectHoursBarChart';
import { LegacyTicketStats } from './LegacyTicketStats';

dayjs.extend(isBetween);

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export const UserDashboard: React.FC = () => {
  const [isManagerMode, setIsManagerMode] = useState(false);
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

  const userTasks = useMemo(() => {
    if (isManagerMode || !currentUser?.id) {
      return filteredTasks;
    }
    return filteredTasks.filter((task) =>
      task.assignees?.some((assignee) => assignee.userId === currentUser.id),
    );
  }, [filteredTasks, currentUser?.id, isManagerMode]);

  const userProjects = useMemo(() => {
    if (isManagerMode) return allProjects;
    if (!currentUser?.id) return [];
    const userProjectIds = new Set(userTasks.map((t) => t.projectId));
    return allProjects.filter((project) => userProjectIds.has(project.id));
  }, [allProjects, userTasks, currentUser?.id, isManagerMode]);

  const userCustomers = useMemo(() => {
    if (isManagerMode) return allCustomers;
    const userCustomerIds = new Set(userProjects.map((p) => p.customerId));
    return allCustomers.filter((customer) => userCustomerIds.has(customer.id));
  }, [userProjects, allCustomers, isManagerMode]);

  const stats = useMemo(
    () =>
      calculateDashboardStats(
        userCustomers,
        userProjects,
        userTasks,
        isManagerMode,
        currentUser?.id,
      ),
    [userCustomers, userProjects, userTasks, isManagerMode, currentUser?.id],
  );

  const hoursByClient = useMemo(
    () =>
      processClientHours(
        userProjects,
        userCustomers,
        userTasks,
        isManagerMode,
        currentUser?.id,
      ),
    [userProjects, userCustomers, userTasks, isManagerMode, currentUser?.id],
  );

  const hoursByProject = useMemo(
    () =>
      processProjectHours(
        userProjects,
        userTasks,
        isManagerMode,
        currentUser?.id,
      ),
    [userProjects, userTasks, isManagerMode, currentUser?.id],
  );

  const ticketStats: TicketStats = useMemo(
    () => calculateTicketStats(userTasks),
    [userTasks],
  );

  const legacyStats = useMemo(
    () => calculateLegacyTicketStats(userTasks),
    [userTasks],
  );

  const upcomingDeadlines: DeadlineInfo[] = useMemo(
    () => getUpcomingDeadlines(userTasks, allPlannings, userProjects),
    [userTasks, allPlannings, userProjects],
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
      };
    return calculateProductivityMetrics(
      userTasks,
      userProjects,
      currentUser.id,
    );
  }, [userTasks, userProjects, currentUser?.id]);

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

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  const renderProductivityReport = () => (
    <Card
      title={
        isManagerMode
          ? 'Kohë reale: Raporti i produktivitetit'
          : 'Kohë reale: Raporti i produktivitetit personal'
      }
    >
      <Typography.Paragraph>
        {isManagerMode ? (
          <>
            Në këtë muaj janë kryer <strong>87%</strong> e orëve të
            planifikuara. Ekipi ka tejkaluar pritshmëritë në projektet kritike.
            <br />
            <br />
            <strong>Rekomandim:</strong> Rishiko prioritetet për klientin B, ku
            janë alokuar më shumë orë se sa është buxhetuar.
          </>
        ) : (
          <>
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
                    ({productivityMetrics.mostActiveProject?.hours || 0}h)
                  </li>
                  <li>
                    Tasks started this week:{' '}
                    <strong>{productivityMetrics.thisWeekTasks}</strong>
                  </li>
                  {productivityMetrics.overdueTasks > 0 && (
                    <li style={{ color: '#ff4d4f' }}>
                      Overdue tasks:{' '}
                      <strong>{productivityMetrics.overdueTasks}</strong>
                    </li>
                  )}
                </ul>
              </>
            ) : (
              'Welcome! Once you are assigned tasks, this dashboard will show your personal metrics.'
            )}
          </>
        )}
      </Typography.Paragraph>
    </Card>
  );

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Title level={3}>
              Welcome back, {currentUser?.firstName} {currentUser?.lastName}!
            </Title>
            <Text type="secondary">
              {isManagerMode
                ? "Here's your team dashboard with all projects and metrics."
                : "Here's your personal dashboard with your assignments and progress."}
            </Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserOutlined style={{ color: '#1890ff' }} />
            <Text strong>User Mode</Text>
            <Switch
              checked={isManagerMode}
              onChange={setIsManagerMode}
              checkedChildren={<TeamOutlined />}
              unCheckedChildren={<UserOutlined />}
            />
            <TeamOutlined style={{ color: '#faad14' }} />
            <Text strong>Manager Mode</Text>
          </div>
        </div>
      </Card>

      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <Space>
            <Text strong>Time Period:</Text>
            <Select
              value={quickFilter}
              onChange={handleQuickFilterChange}
              style={{ width: 120 }}
            >
              <Select.Option value="today">Today</Select.Option>
              <Select.Option value="week">This Week</Select.Option>
              <Select.Option value="month">This Month</Select.Option>
              <Select.Option value="lastMonth">Last Month</Select.Option>
              <Select.Option value="quarter">Last 3 Months</Select.Option>
              <Select.Option value="year">This Year</Select.Option>
              <Select.Option value="custom">Custom Range</Select.Option>
            </Select>
            {quickFilter === 'custom' && (
              <RangePicker
                value={dateRange}
                onChange={handleDateRangeChange}
                format="MMM DD, YYYY"
              />
            )}
          </Space>
          {currentDateRange && (
            <Text type="secondary">
              Showing data from {currentDateRange[0].format('MMM DD, YYYY')} to{' '}
              {currentDateRange[1].format('MMM DD, YYYY')}
            </Text>
          )}
        </div>
      </Card>

      {isManagerMode ? (
        <>
          <ManagerStatsCards
            activePlannings={
              allPlannings.filter((p: IPlanning) => !p.isCompleted).length
            }
            totalProjects={stats.totalProjects}
            plannedHours={stats.plannedHours}
            workedHours={stats.workedHours}
          />
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
          <UserStatsCards
            activeTasks={userTasks.filter((t) => !t.isCompleted).length}
            projectCount={userProjects.length}
            completionRate={productivityMetrics.taskCompletionRate}
            plannedHours={stats.plannedHours}
          />
          <Row gutter={16}>
            <Col span={14}>
              <TicketStatsCard
                stats={ticketStats}
                title="Statistikat e Tiketave"
              />
            </Col>
            <Col span={10}>
              <DeadlineTracker
                deadlines={upcomingDeadlines}
                title="Upcoming Deadlines"
              />
            </Col>
          </Row>
          <ProjectHoursBarChart
            data={hoursByProject}
            title="Orët e shpenzuara sipas projektit"
          />
        </>
      )}

      {renderProductivityReport()}
    </Space>
  );
};

export default UserDashboard;
