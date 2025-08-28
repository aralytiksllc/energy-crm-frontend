// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';

// Internal
import { ICustomer } from '@/interfaces/customers';
import { Edit } from '@/components/edit';
import { CustomerForm } from './components/customer-form';

export type CustomerEditProps = {};

export const CustomerEdit: React.FC<CustomerEditProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm<ICustomer>({
    resource: 'customers',
    action: 'edit',
    redirect: false,
  });

  return (
    <Edit
      resource="customers"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
      breadcrumb={false}
      goBack={false}
    >
      <CustomerForm formProps={formProps} />
    </Edit>
  );
};
