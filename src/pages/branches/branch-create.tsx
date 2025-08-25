// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IBranch } from '@/interfaces/branches';
import { Create } from '@/components/create';
import { BranchForm } from './components/branch-form';

export type BranchCreateProps = {};

export const BranchCreate: React.FC<BranchCreateProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm<
    IBranch,
    HttpError,
    IBranch
  >({
    resource: 'branches',
    action: 'create',
    redirect: 'list',
  });

  return (
    <Create
      title="Create Branch"
      resource="branches"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <BranchForm formProps={formProps} />
    </Create>
  );
};
