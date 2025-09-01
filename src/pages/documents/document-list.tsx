// External
import * as React from 'react';
import { Table, Empty } from 'antd';
import { useTable } from '@refinedev/antd';
import { useParams } from 'react-router';

// Internal
import { IDocument } from '@/interfaces/documents';
import { List } from '@/components/list';
import { columns } from './constants/document-columns';

export type DocumentListProps = {};

const emptyText = <Empty description="No documents found." />;

export const DocumentList: React.FC<DocumentListProps> = () => {
  const { customerId } = useParams();

  const { tableProps } = useTable<IDocument>({
    resource: 'documents',
    filters: {
      initial: [
        {
          field: 'customerId',
          operator: '=' as any,
          value: customerId,
        },
      ],
    },
  });

  return (
    <List title="Documents">
      <Table
        {...tableProps}
        columns={columns}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText }}
        pagination={false}
        rowKey="id"
      />
    </List>
  );
};
