import { Spin } from 'antd';
import { useGetIdentity, useList } from '@refinedev/core';
import { UserDashboard, ManagerDashboard } from './components';
import { IUser, IPlanning, Task } from '@interfaces/index';
import { IProject } from '@interfaces/project';
import { ICustomer } from '@interfaces/customer';
import { useDashboardStyles } from './dashboard.styles';

export function Dashboard() {
  const { styles } = useDashboardStyles();
  const { data: identity, isLoading: userLoading } = useGetIdentity<IUser>();
  const { data: projectsData, isLoading: projectsLoading } = useList<IProject>({
    resource: 'projects',
    pagination: { mode: 'off' },
  });

  const { data: tasksData, isLoading: tasksLoading } = useList<Task>({
    resource: 'tasks',
    pagination: { mode: 'off' },
  });

  const { data: customersData, isLoading: customersLoading } =
    useList<ICustomer>({
      resource: 'customers',
      pagination: { mode: 'off' },
    });

  const { data: planningsData, isLoading: planningsLoading } =
    useList<IPlanning>({
      resource: 'plannings',
      pagination: { mode: 'off' },
    });

  if (
    userLoading ||
    projectsLoading ||
    tasksLoading ||
    customersLoading ||
    planningsLoading
  ) {
    return (
      <div className={styles.spinnerContainer}>
        <Spin size="large" />
      </div>
    );
  }

  const isManagerOrAdmin =
    identity?.role?.name === 'superadmin' || identity?.role?.name === 'manager';

  if (isManagerOrAdmin) {
    return (
      <ManagerDashboard
        currentUser={identity}
        plannings={planningsData?.data}
        tasks={tasksData?.data}
        projects={projectsData?.data}
        customers={customersData?.data}
      />
    );
  }

  return (
    <UserDashboard
      currentUser={identity}
      plannings={planningsData?.data}
      tasks={tasksData?.data}
      projects={projectsData?.data}
      customers={customersData?.data}
    />
  );
}
