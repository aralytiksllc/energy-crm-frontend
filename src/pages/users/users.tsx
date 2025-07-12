import React, { useCallback, useState, useMemo } from 'react';
import type { FormProps } from 'antd';
import { LogicalFilter } from '@refinedev/core';
import { IUser } from '@interfaces/users';
import { Team } from '@interfaces/team.enum';
import { UsersForm } from './components/user-form';
import { createColumns } from './constants/table';
import { CrudTable } from '@components/crud-table/crud-table';
import { DropdownFilter } from '@components/dropdown-filter/dropdown-filter';
import { useGetIdentity } from '@refinedev/core';
import { useResourcePermissions } from '../../hooks/use-resource-permissions';
import { filterColumnsByPermissions } from '../../utils/table-utils';

const TEAM_OPTIONS = [
  { label: 'All Teams', value: 'all' },
  ...Object.values(Team).map((team) => ({
    label: team,
    value: team,
  })),
];

export const Users: React.FC = () => {
  const [teamFilter, setTeamFilter] = useState<LogicalFilter | undefined>(
    undefined,
  );

  const handleTeamChange = (value: string) => {
    if (value === 'all') {
      setTeamFilter(undefined);
    } else {
      setTeamFilter({
        field: 'team',
        operator: 'eq',
        value,
      });
    }
  };

  const { data: identity } = useGetIdentity<IUser>();
  const permissions = useResourcePermissions({ resource: 'users' });

  const tableColumns = useMemo(() => {
    const allColumns = createColumns();
    return filterColumnsByPermissions(
      allColumns,
      permissions.hasActionsPermission,
    );
  }, [permissions.hasActionsPermission]);

  const renderForm = useCallback((formProps: FormProps) => {
    const { onFinish, ...restFormProps } = formProps;
    const isEdit = !!formProps?.initialValues?.id;

    const handleFinish = async (values: any) => {
      const transformedValues = { ...values };

      Object.keys(transformedValues).forEach((key) => {
        if (
          transformedValues[key] === undefined ||
          transformedValues[key] === ''
        ) {
          delete transformedValues[key];
        }
      });

      if (
        transformedValues.isActive === undefined ||
        transformedValues.isActive === null
      ) {
        transformedValues.isActive = true;
      } else {
        transformedValues.isActive = Boolean(transformedValues.isActive);
      }

      if (!transformedValues.team || transformedValues.team === '') {
        delete transformedValues.team;
      }

      if (
        isEdit &&
        (!transformedValues.password || transformedValues.password === '')
      ) {
        delete transformedValues.password;
      }

      if (onFinish) {
        await onFinish(transformedValues);
      }
    };

    return (
      <UsersForm
        formProps={{ ...restFormProps, onFinish: handleFinish }}
        mode={isEdit ? 'edit' : 'create'}
      />
    );
  }, []);

  const permanentFilters = useMemo(() => {
    const filters: LogicalFilter[] = [];
    if (teamFilter) {
      filters.push(teamFilter);
    }
    if (identity?.role?.name === 'user') {
      filters.push({
        field: 'id',
        operator: 'eq',
        value: identity.id,
      });
    }
    return filters;
  }, [teamFilter, identity]);

  const isManager = identity?.role?.name === 'manager';

  return (
    <CrudTable<IUser & { id: number }>
      resource="users"
      renderForm={renderForm}
      columns={tableColumns}
      headerActions={
        isManager ? (
          <DropdownFilter options={TEAM_OPTIONS} onChange={handleTeamChange} />
        ) : undefined
      }
      permanentFilters={permanentFilters}
      drawerTitles={{
        create: 'Create User',
        edit: 'Edit User',
        view: 'User Details',
      }}
      showCreateButton={permissions.canCreate}
    />
  );
};
