import React from 'react';
import { Table, Checkbox } from 'antd';
import { useTable } from '@refinedev/antd';
import type { ColumnsType } from 'antd/es/table';
import { SizeType } from 'antd/es/config-provider/SizeContext';

export interface GenericTableProps<TData> {
  resource: string;
  columns: ColumnsType<TData>;
  dataSource?: TData[];
  showCheckbox?: boolean;
  showPagination?: boolean;
  pageSize?: number;
  size?: 'small' | 'middle' | 'default';
  scroll?: { x?: boolean | number; y?: boolean | number };
  rowKey?: string;
  onRow?: (record: TData, index?: number) => React.HTMLAttributes<HTMLElement>;
}

export const GenericTable = <TData extends Record<string, any>>({
  resource,
  columns,
  dataSource,
  showCheckbox = false,
  showPagination = false,
  pageSize = 10,
  size = 'middle',
  scroll = { x: true },
  rowKey = 'id',
  onRow,
}: GenericTableProps<TData>) => {
  const { tableProps } = useTable<TData>({
    resource,
    pagination: showPagination ? { pageSize } : undefined,
  });

  // Add checkbox column if requested
  const finalColumns: ColumnsType<TData> = React.useMemo(() => {
    if (showCheckbox) {
      return [
        {
          title: <Checkbox />,
          dataIndex: 'checkbox',
          key: 'checkbox',
          width: 50,
          render: () => <Checkbox />,
        },
        ...columns,
      ];
    }
    return columns;
  }, [columns, showCheckbox]);

  return (
    <Table<TData>
      {...tableProps}
      columns={finalColumns}
      dataSource={dataSource}
      pagination={showPagination ? tableProps.pagination : false}
      size={size as SizeType}
      scroll={scroll as any}
      rowKey={rowKey}
      onRow={onRow}
    />
  );
};
