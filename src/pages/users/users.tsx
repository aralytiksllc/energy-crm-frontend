// External imports
import React, { useCallback, useState, useMemo } from 'react';
import type { FormProps } from 'antd';
import { LogicalFilter } from '@refinedev/core';

// Internal imports
import { IUser } from '@interfaces/users';
import { Team } from '@interfaces/team.enum';
import { UsersForm } from './components/user-form';
import { columns } from './constants/table';
import { CrudTable } from '@components/crud-table/crud-table';
import { DropdownFilter } from '@components/dropdown-filter/dropdown-filter';
import { useGetIdentity } from '@refinedev/core';

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

  const renderForm = useCallback((formProps: FormProps) => {
    const { onFinish, ...restFormProps } = formProps;
    const isEdit = !!formProps?.initialValues?.id;

    const handleFinish = async (values: any) => {
      const transformedValues = { ...values };
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
    if (identity?.role === 'user') {
      filters.push({
        field: 'id',
        operator: 'eq',
        value: identity.id,
      });
    }
    return filters;
  }, [teamFilter, identity]);

  return (
    <CrudTable<IUser>
      resource="users"
      renderForm={renderForm}
      columns={columns}
      headerActions={
        <DropdownFilter options={TEAM_OPTIONS} onChange={handleTeamChange} />
      }
      permanentFilters={permanentFilters}
      drawerTitles={{
        create: 'Create User',
        edit: 'Edit User',
        view: 'User Details',
      }}
    />
  );
};
