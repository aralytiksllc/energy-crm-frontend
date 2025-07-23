import React, { useMemo } from 'react';

import { Row, Col } from 'antd';
import { IUser, IPlanning, IProject, ICustomer, Task } from '@interfaces/index';
import dayjs from 'dayjs';

import {
  calculateTicketStats,
  getUpcomingDeadlines,
  getOverdueDeadlines,
  calculateProductivityMetrics,
  type TicketStats,
  type DeadlineInfo,
  type ProductivityMetrics,
} from '../utils';
import { useDateFilter } from '../hooks/use-date-filter';
import {
  DashboardLayout,
  StatsCards,
  TaskProgressCard,
  ProductivityCard,
  ScrollableListCard,
} from './common';
import {
  DASHBOARD_CONSTANTS,
  PRIORITY_COLORS,
  STAT_CARD_COLORS,
} from '../constants/dashboard.constants';
import { useUserDashboardStyles } from './user-dashboard.styles';

interface UserDashboardProps {
  currentUser?: IUser;
  plannings?: IPlanning[];
  tasks?: Task[];
  projects?: IProject[];
  customers?: ICustomer[];
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentUser,
  tasks,
  projects,
}) => {
  const { styles } = useUserDashboardStyles();
  const allTasks = tasks || [];
  const allProjects = projects || [];

  const {
    quickFilter,
    dateRange,
    filteredData: filteredTasks,
    handleQuickFilterChange,
    handleDateRangeChange,
  } = useDateFilter(allTasks);

  const userFilteredTasks = useMemo(() => {
    if (!currentUser?.id) return [];
    return filteredTasks.filter((task: Task) =>
      task.assignees?.some(
        (assignee: any) => assignee.userId === currentUser.id,
      ),
    );
  }, [filteredTasks, currentUser?.id]);

  const userHoursByProject = useMemo(() => {
    if (!currentUser?.id) return [];

    const userProjects = allProjects.filter((project) =>
      userFilteredTasks.some((task: Task) => task.projectId === project.id),
    );

    return userProjects
      .map((project) => {
        const projectTasks = userFilteredTasks.filter(
          (task: Task) => task.projectId === project.id,
        );

        const plannedHours = projectTasks.reduce(
          (total: number, task: Task) => {
            const userAssignee = task.assignees?.find(
              (assignee: any) => assignee.userId === Number(currentUser.id),
            );
            return total + (userAssignee?.estimatedHours || 0);
          },
          0,
        );

        const actualHours = projectTasks.reduce((total: number, task: Task) => {
          const userAssignee = task.assignees?.find(
            (assignee: any) => assignee.userId === Number(currentUser.id),
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
      .slice(0, DASHBOARD_CONSTANTS.MAX_PROJECT_HOURS_DISPLAY);
  }, [allProjects, userFilteredTasks, currentUser?.id]);

  const ticketStats: TicketStats = useMemo(
    () => calculateTicketStats(userFilteredTasks, Number(currentUser?.id)),
    [userFilteredTasks, currentUser],
  );

  const upcomingDeadlines: DeadlineInfo[] = useMemo(
    () =>
      getUpcomingDeadlines(
        userFilteredTasks,
        allProjects,
        Number(currentUser?.id),
        DASHBOARD_CONSTANTS.UPCOMING_DEADLINES_DAYS,
      ),
    [userFilteredTasks, allProjects, currentUser?.id],
  );

  const overdueDeadlines: DeadlineInfo[] = useMemo(
    () =>
      getOverdueDeadlines(
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

  const getPriorityColor = (priority: string) => {
    return (
      PRIORITY_COLORS[
        priority?.toLowerCase() as keyof typeof PRIORITY_COLORS
      ] || PRIORITY_COLORS.default
    );
  };

  const statsCards = [
    {
      title: 'My Tasks',
      value: productivityMetrics.totalUserTasks,
      color: STAT_CARD_COLORS.primary,
    },
    {
      title: 'Completed',
      value: productivityMetrics.completedTasks,
      color: STAT_CARD_COLORS.success,
    },
    {
      title: 'This Week',
      value: productivityMetrics.thisWeekTasks,
      color: STAT_CARD_COLORS.warning,
    },
    {
      title: 'Overdue',
      value: productivityMetrics.overdueTasks,
      color: STAT_CARD_COLORS.danger,
    },
  ];

  const deadlineListData = upcomingDeadlines.map((deadline) => ({
    id: deadline.title,
    title: deadline.title,
    subtitle: `${deadline.projectName ? `${deadline.projectName} • ` : ''}${dayjs(deadline.dueDate).format('MMM DD, YYYY')}`,
    tag: {
      text: deadline.isOverdue ? 'OVERDUE' : deadline.priority.toUpperCase(),
      color: deadline.isOverdue
        ? '#ff4d4f'
        : getPriorityColor(deadline.priority),
    },
    isOverdue: deadline.isOverdue,
  }));

  const overdueListData = overdueDeadlines.map((deadline) => ({
    id: deadline.title,
    title: deadline.title,
    subtitle: `${deadline.projectName ? `${deadline.projectName} • ` : ''}${dayjs(deadline.dueDate).format('MMM DD, YYYY')}`,
    tag: {
      text: 'OVERDUE',
      color: '#ff4d4f',
    },
    isOverdue: true,
  }));

  const projectHoursListData = userHoursByProject.map((project) => ({
    id: project.name,
    title: project.name,
    subtitle: `Planned: ${project.plannedHours}h • Actual: ${project.actualHours}h`,
    rightContent: (
      <span className={styles.projectHoursValue}>{project.totalHours}h</span>
    ),
  }));

  return (
    <DashboardLayout
      currentUser={currentUser}
      dashboardType="user"
      quickFilter={quickFilter}
      dateRange={dateRange}
      onQuickFilterChange={handleQuickFilterChange}
      onDateRangeChange={handleDateRangeChange}
    >
      <StatsCards stats={statsCards} />

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <TaskProgressCard
            ticketStats={ticketStats}
            title="My Task Progress"
          />
        </Col>
        <Col xs={24} lg={12}>
          <ProductivityCard
            productivityMetrics={productivityMetrics}
            title="My Productivity"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <ScrollableListCard
            title="My Upcoming Deadlines"
            data={deadlineListData}
            emptyMessage="No upcoming deadlines"
          />
        </Col>
        <Col xs={24} lg={12}>
          <ScrollableListCard
            title="My Project Hours"
            data={projectHoursListData}
            emptyMessage="No project hours available"
          />
        </Col>
      </Row>

      {overdueDeadlines.length > 0 && (
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <ScrollableListCard
              title="Overdue Deadlines"
              data={overdueListData}
              emptyMessage="No overdue deadlines"
            />
          </Col>
        </Row>
      )}
    </DashboardLayout>
  );
};

export default UserDashboard;
