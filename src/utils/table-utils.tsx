import React from 'react';
import { Space } from 'antd';
import { useCan } from '@refinedev/core';
import { EditButton } from '@components/edit-button';
import { DeleteButton } from '@components/delete-button';
import { formatTableDate } from '@helpers/date-utils';
import { FilterColumn } from '@components/column-filter/column-filter.types';

export const createActionButtons = <T extends { id: number | string }>(
  resource: string,
  getDisplayName?: (record: T) => string,
) => {
  const ActionButtons: React.FC<{ record: T }> = ({ record }) => {
    const { data: canEdit } = useCan({
      resource,
      action: 'edit',
      params: { id: record.id },
    });

    const { data: canDelete } = useCan({
      resource,
      action: 'delete',
      params: { id: record.id },
    });

    return (
      <Space size={8}>
        {canEdit?.can && (
          <EditButton
            resourceId={record.id as number}
            resource={resource}
            type="default"
            size="small"
            danger={false}
          />
        )}
        {canDelete?.can && (
          <DeleteButton
            confirmTitle={`Are you sure you want to delete ${getDisplayName ? `"${getDisplayName(record)}"` : 'this item'}?`}
            confirmMessage="This action cannot be undone."
            resourceId={record.id as number}
            resource={resource}
            type="primary"
            size="small"
            danger={true}
          />
        )}
      </Space>
    );
  };

  return ActionButtons;
};

export const createIdColumn = (): FilterColumn<any> => ({
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  sorter: true,
  filterType: 'number',
});

export const createTextColumn = (
  title: string,
  dataIndex: string,
  key?: string,
): FilterColumn<any> => ({
  title,
  dataIndex,
  key: key || dataIndex,
  sorter: true,
  filterType: 'text',
});

export const createDateColumn = (
  title: string,
  dataIndex: string,
  key?: string,
): FilterColumn<any> => ({
  title,
  dataIndex,
  key: key || dataIndex,
  sorter: true,
  filterType: 'date',
  render: (date: Date | string) => formatTableDate(date),
});

export const createBooleanColumn = (
  title: string,
  dataIndex: string,
  key?: string,
  trueLabel = 'Yes',
  falseLabel = 'No',
): FilterColumn<any> => ({
  title,
  dataIndex,
  key: key || dataIndex,
  sorter: true,
  render: (value: boolean) => (value ? trueLabel : falseLabel),
});

export const createActionsColumn = <T extends { id: number | string }>(
  resource: string,
  getDisplayName?: (record: T) => string,
): FilterColumn<T> => {
  const ActionButtons = createActionButtons(resource, getDisplayName);

  return {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    fixed: 'right',
    width: 100,
    render: (_, record) => <ActionButtons record={record} />,
  };
};

export const filterColumnsByPermissions = <T extends object>(
  columns: FilterColumn<T>[],
  hasActionsPermission: boolean,
): FilterColumn<T>[] => {
  if (!hasActionsPermission) {
    return columns.filter((column) => column.key !== 'actions');
  }
  return columns;
};
