// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IBranch } from '@/interfaces/branches';
import { Edit } from '@/components/edit';
import { BranchForm } from './components/branch-form';

export type BranchEditProps = {};

export const BranchEdit: React.FC<BranchEditProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm<
    IBranch,
    HttpError,
    IBranch
  >({
    resource: 'branches',
    action: 'edit',
    redirect: 'list',
  });

  return (
    <Edit
      title="Edit Branch"
      resource="branches"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <BranchForm formProps={formProps} />
    </Edit>
  );
};
