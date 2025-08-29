// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IContract } from '@/interfaces/contracts';
import { Create } from '@/components/create';
import { ContractForm } from './components/contract-form';

export type ContractCreateProps = {};

export const ContractCreate: React.FC<ContractCreateProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm<
    IContract,
    HttpError,
    IContract
  >({
    resource: 'contracts',
    action: 'create',
    redirect: 'list',
  });

  return (
    <Create
      title="Create Contract"
      resource="contracts"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <ContractForm formProps={formProps} />
    </Create>
  );
};
