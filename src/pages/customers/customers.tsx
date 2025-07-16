import React, { useMemo } from 'react';
import { FormProps } from 'antd';
import { useCan, useList } from '@refinedev/core';

import type { Customer } from './types/customer.types';
import { CrudTable } from '@components/crud-table/crud-table';
import { CustomerForm } from './components/customer-form';
import { createColumns } from './constants/table';
import { DeleteButton } from '@components/delete-button';
import { EditButton } from '@components/edit-button';
import { Space } from 'antd';

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

  const { data: projectsData } = useList({
    resource: 'projects',
    pagination: { mode: 'off' },
  });

  const customerRelationships = useMemo(() => {
    const projects = projectsData?.data || [];
    const map: Record<
      number,
      { hasRelated: boolean; message: React.ReactNode }
    > = {};

    projects.forEach((project: any) => {
      if (!map[project.customerId]) {
        map[project.customerId] = { hasRelated: false, message: null };
      }
      map[project.customerId].hasRelated = true;
    });

    Object.keys(map).forEach((customerId) => {
      const relatedProjects = projects.filter(
        (project: any) => project.customerId === Number(customerId),
      );
      if (relatedProjects.length > 0) {
        map[Number(customerId)].message = (
          <div>
            <p>
              This customer cannot be deleted because it has active projects:
            </p>
            <p>
              <strong>
                {relatedProjects
                  .slice(0, 5)
                  .map((p: any) => p.name)
                  .join(', ')}
              </strong>
            </p>
            {relatedProjects.length > 5 && (
              <p>... and {relatedProjects.length - 5} more</p>
            )}
            <p>
              Please delete or reassign these projects first before deleting the
              customer.
            </p>
          </div>
        );
      }
    });
    return map;
  }, [projectsData]);

  // Check if user has any actions permissions
  const hasActionsPermission = canEdit?.can || canDelete?.can;

  // Create columns based on permissions
  const tableColumns = useMemo(() => {
    const allColumns = createColumns();

    // If user has no actions permissions, remove the actions column entirely
    if (!hasActionsPermission) {
      return allColumns.filter((column) => column.key !== 'actions');
    }

    return allColumns.map((col) => {
      if (col.key === 'actions') {
        return {
          ...col,
          render: (_: any, record: Customer) => {
            const ActionButtons = () => {
              const { data: canEditRecord } = useCan({
                resource: 'customers',
                action: 'edit',
                params: { id: record.id },
              });

              const { data: canDeleteRecord } = useCan({
                resource: 'customers',
                action: 'delete',
                params: { id: record.id },
              });

              const customerRel = customerRelationships[record.id] || {
                hasRelated: false,
                message: null,
              };

              return (
                <Space size="middle">
                  {canEditRecord?.can && (
                    <EditButton
                      resource="customers"
                      resourceId={record.id}
                      type="default"
                      size="small"
                    />
                  )}
                  {canDeleteRecord?.can && (
                    <DeleteButton
                      resource="customers"
                      resourceId={record.id}
                      confirmTitle={`Delete customer "${record.name}"?`}
                      type="primary"
                      size="small"
                      hasRelatedData={customerRel.hasRelated}
                      relatedInfoMessage={customerRel.message}
                    />
                  )}
                </Space>
              );
            };
            return <ActionButtons />;
          },
        };
      }
      return col;
    });
  }, [hasActionsPermission, customerRelationships]);

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
