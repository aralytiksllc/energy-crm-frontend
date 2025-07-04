import { Spin } from 'antd';
import { useGetIdentity, useList } from '@refinedev/core';
import { UserDashboard } from './components/user-dashboard';
import { IUser } from '@interfaces/users';

import { IProject } from '@interfaces/project';
import { Task } from '@components/task-card/task-card.types';
import { ICustomer } from '@interfaces/customer';

export function Dashboard() {
  const { isLoading: userLoading } = useGetIdentity<IUser>();
  const { isLoading: projectsLoading } = useList<IProject>({
    resource: 'projects',
    pagination: { mode: 'off' },
  });

  const { isLoading: tasksLoading } = useList<Task>({
    resource: 'tasks',
    pagination: { mode: 'off' },
  });

  const { isLoading: customersLoading } = useList<ICustomer>({
    resource: 'customers',
    pagination: { mode: 'off' },
  });

  if (userLoading || projectsLoading || tasksLoading || customersLoading) {
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
  return <UserDashboard />;
}
