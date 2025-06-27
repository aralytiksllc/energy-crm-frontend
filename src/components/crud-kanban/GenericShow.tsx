import React from 'react';
import { Descriptions } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface GenericShowProps<T> {
  columns: ColumnsType<T>;
  record: T;
  bordered?: boolean;
  column?: number;
}

export function GenericShow<T extends object>({
  columns,
  record,
  bordered = true,
  column = 1,
}: GenericShowProps<T>) {
  return (
    <Descriptions bordered={bordered} column={column}>
      {columns.map((col: any) => {
        if (!col.dataIndex || col.hideInDescriptions) return null;

        const key = Array.isArray(col.dataIndex)
          ? col.dataIndex.join('.')
          : col.dataIndex;

        const value = key
          .split('.')
          .reduce((acc: any, curr: any) => acc?.[curr], record);

        return (
          <Descriptions.Item
            key={col.key ?? key}
            label={col.title as React.ReactNode}
            span={col.span ?? 1}
          >
            {col.render ? col.render(value, record, 0) : String(value ?? '—')}
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
}
