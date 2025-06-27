import React, { useCallback } from 'react';
import { FormProps } from 'antd';

import type { Customer } from './types/customer.types';
import { CrudTable } from '@components/crud-table/crud-table';
import { CustomerForm } from './components/customer-form';
import { columns } from './constants/table';

export const Customers: React.FC = () => {
  const renderForm = React.useCallback(
    (formProps: FormProps) => <CustomerForm formProps={formProps} />,
    [],
  );

  return (
    <CrudTable<Customer>
      resource="customers"
      renderForm={renderForm}
      columns={columns}
      drawerTitles={{
        create: 'Create Customer',
        edit: 'Edit Customer',
        view: 'Customer Details',
      }}
    />
  );
};
