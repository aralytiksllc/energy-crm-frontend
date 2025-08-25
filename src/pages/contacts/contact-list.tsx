// External
import * as React from 'react';
import { useTable } from '@refinedev/antd';
import { Table } from 'antd';

// Internal
import { IContact } from '@/interfaces/contacts';
import { List } from '@/components/list';
import { contactColumns } from './constants/contact-table';

export type ContactListProps = {};

export const ContactList: React.FC<ContactListProps> = () => {
  const { tableProps } = useTable<IContact>({
    resource: 'contacts',
  });

  const keyExtractor = React.useCallback(
    (record: IContact, _index?: number) => record.id,
    [],
  );

  return (
    <List title="Contacts">
      <Table
        {...tableProps}
        rowKey={keyExtractor}
        pagination={false}
        columns={contactColumns}
      />
    </List>
  );
};
