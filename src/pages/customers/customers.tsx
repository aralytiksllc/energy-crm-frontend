import React, { useCallback, useMemo } from 'react';
import { FormProps } from 'antd';
import { useCan } from '@refinedev/core';

import type { Customer } from './types/customer.types';
import { CrudTable } from '@components/crud-table/crud-table';
import { CustomerForm } from './components/customer-form';
import { columns, createColumns } from './constants/table';

export const Customers: React.FC = () => {
  const { data: canCreate } = useCan({
    resource: 'customers',
    action: 'create',
  });

  const { data: canEdit } = useCan({
    resource: 'customers',
    action: 'edit',
  });

  const { data: canDelete } = useCan({
    resource: 'customers',
    action: 'delete',
  });

  // Check if user has any actions permissions
  const hasActionsPermission = canEdit?.can || canDelete?.can;

  // Create columns based on permissions
  const tableColumns = useMemo(() => {
    const allColumns = createColumns();

    // If user has no actions permissions, remove the actions column entirely
    if (!hasActionsPermission) {
      return allColumns.filter((column) => column.key !== 'actions');
    }

    return allColumns;
  }, [hasActionsPermission]);

  const renderForm = React.useCallback(
    (formProps: FormProps) => <CustomerForm formProps={formProps} />,
    [],
  );

  return (
    <CrudTable<Customer>
      resource="customers"
      renderForm={renderForm}
      columns={tableColumns}
      drawerTitles={{
        create: 'Create Customer',
        edit: 'Edit Customer',
        view: 'Customer Details',
      }}
      showCreateButton={canCreate?.can}
    />
  );
};
