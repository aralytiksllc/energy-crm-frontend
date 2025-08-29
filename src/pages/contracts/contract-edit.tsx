// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IContract } from '@/interfaces/contracts';
import { Edit } from '@/components/edit';
import { ContractForm } from './components/contract-form';

export type ContractEditProps = {};

export const ContractEdit: React.FC<ContractEditProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm<
    IContract,
    HttpError,
    IContract
  >({
    resource: 'contracts',
    action: 'edit',
    redirect: 'list',
  });

  return (
    <Edit
      title="Edit contract"
      resource="contracts"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <ContractForm formProps={formProps} />
    </Edit>
  );
};
