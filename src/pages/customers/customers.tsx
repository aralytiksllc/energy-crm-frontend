import React, { useMemo } from 'react';
import { FormProps } from 'antd';

import type { Customer } from './types/customer.types';
import { CrudTable } from '@components/crud-table/crud-table';
import { CustomerForm } from './components/customer-form';
import { createColumns } from './constants/table';
import { ActionButtons } from '@components/action-buttons';
import { usePermissions } from '@hooks/use-permissions';
import { useRelationshipCheck } from '@hooks/use-relationship-check';

export const Customers: React.FC = () => {
  const permissions = usePermissions({ resource: 'customers' });

  const customerRelationships = useRelationshipCheck({
    resource: 'customer',
    relatedResource: 'projects',
    foreignKey: 'customerId',
    titleField: 'name',
    maxDisplayItems: 5,
  }) as unknown as Record<
    number,
    import('@hooks/use-relationship-check').RelationshipInfo
  >;

  // Create columns based on permissions
  const tableColumns = useMemo(() => {
    const allColumns = createColumns();

    if (!permissions.hasActionsPermission) {
      return allColumns.filter((column) => column.key !== 'actions');
    }

    return allColumns.map((col) => {
      if (col.key === 'actions') {
        return {
          ...col,
          render: (_: any, record: Customer) => (
            <ActionButtons
              resource="customers"
              recordId={record.id}
              recordTitle={record.name}
              relationshipInfo={customerRelationships?.[record.id]}
            />
          ),
        };
      }
      return col;
    });
  }, [permissions.hasActionsPermission, customerRelationships]);

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
      showCreateButton={permissions.canCreate}
    />
  );
};
