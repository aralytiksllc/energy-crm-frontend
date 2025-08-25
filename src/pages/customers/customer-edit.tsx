// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import { useParams } from 'react-router';

// Internal
import { ICustomer } from '@/interfaces/customers';
import { Edit } from '@/components/edit';
import { CustomerForm } from './components/customer-form';

export type CustomerEditProps = {};

export const CustomerEdit: React.FC<CustomerEditProps> = () => {
  const { id } = useParams();

  const { formLoading, formProps, saveButtonProps } = useForm<ICustomer>({
    resource: 'customers',
    action: 'edit',
    id: id,
    redirect: false,
  });

  return (
    <Edit
      resource="customers"
      saveButtonProps={saveButtonProps}
      recordItemId={id}
      isLoading={formLoading}
      breadcrumb={false}
      goBack={false}
    >
      <CustomerForm formProps={formProps} />
    </Edit>
  );
};
