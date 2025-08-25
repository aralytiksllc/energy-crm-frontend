// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';

// Internal
import { ICustomer } from '@/interfaces/customers';
import { Create } from '@/components/create';
import { CustomerForm } from './components/customer-form';

export type CustomerCreateProps = {};

export const CustomerCreate: React.FC<CustomerCreateProps> = () => {
  const { formLoading, formProps, saveButtonProps, redirect } =
    useForm<ICustomer>({
      resource: 'customers',
      action: 'create',
      redirect: false,
      onMutationSuccess(response) {
        const id = response.data.id;
        return redirect('edit', id, { id });
      },
    });

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
      breadcrumb={false}
      goBack={false}
    >
      <CustomerForm formProps={formProps} />
    </Create>
  );
};
