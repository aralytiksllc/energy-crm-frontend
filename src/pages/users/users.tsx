import React, { useCallback, useMemo } from 'react';
import { FormProps } from 'antd';
import { useGetIdentity } from '@refinedev/core';

import type { IUser } from '@interfaces/users';
import { CrudTable } from '@components/crud-table/crud-table';
import { UsersForm } from './components/user-form';
import { createColumns } from './constants/table';
import { ActionButtons } from '@components/action-buttons';
import { usePermissions } from '@hooks/use-permissions';
import { useUserRelationships } from '@hooks/use-user-relationships';

export const Users: React.FC = () => {
  const { data: identity } = useGetIdentity<IUser>();
  const permissions = usePermissions({ resource: 'users' });
  const userRelationships = useUserRelationships();

  const tableColumns = useMemo(() => {
    const allColumns = createColumns();

    if (!permissions.hasActionsPermission) {
      return allColumns.filter((column) => column.key !== 'actions');
    }

    return allColumns.map((col) => {
      if (col.key === 'actions') {
        return {
          ...col,
          render: (_: any, record: IUser) => (
            <ActionButtons
              resource="users"
              recordId={record.id as number}
              recordTitle={`${record.firstName} ${record.lastName}`}
              relationshipInfo={userRelationships[record.id as number]}
            />
          ),
        };
      }
      return col;
    });
  }, [permissions.hasActionsPermission, userRelationships]);

  const renderForm = useCallback((formProps: FormProps) => {
    const isEdit = !!formProps?.initialValues?.id;
    return (
      <UsersForm formProps={formProps} mode={isEdit ? 'edit' : 'create'} />
    );
  }, []);

  const permanentFilters = useMemo(() => {
    const isAdminOrManager =
      identity?.role?.name === 'superadmin' ||
      identity?.role?.name === 'manager';

    return isAdminOrManager ? [] : [];
  }, [identity]);

  return (
    <CrudTable<IUser & { id: number }>
      resource="users"
      renderForm={renderForm}
      columns={tableColumns}
      drawerTitles={{
        create: 'Create User',
        edit: 'Edit User',
        view: 'User Details',
      }}
      showCreateButton={permissions.canCreate}
      permanentFilters={permanentFilters}
    />
  );
};
