// External
import * as React from 'react';
import { Table, Empty } from 'antd';
import { useTable } from '@refinedev/antd';
import { useParams } from 'react-router';

// Internal
import { IContact } from '@/interfaces/contacts';
import { List } from '@/components/list';
import { columns } from './constants/contact-columns';

export type ContactListProps = {};

const emptyText = <Empty description="No contacts found." />;

export const ContactList: React.FC<ContactListProps> = () => {
  const { customerId } = useParams();

  const { tableProps } = useTable<IContact>({
    resource: 'contacts',
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
    <List title="Contacts">
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
