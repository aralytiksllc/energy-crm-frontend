// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IConsumptionFile } from '@/interfaces/consumptions';
import { Edit } from '@/components/edit';
import { ConsumptionForm } from './components/consumption-form';
import { useParams } from 'react-router';

export type ConsumptionEditProps = {};

export const ConsumptionEdit: React.FC<ConsumptionEditProps> = () => {
  const { customerId } = useParams();

  const { formLoading, formProps, saveButtonProps } = useForm<
    IConsumptionFile,
    HttpError,
    IConsumptionFile
  >({
    resource: 'consumptions',
    action: 'edit',
    redirect: 'list',
  });

  return (
    <Edit
      title="Edit Consumption"
      resource="consumptions"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <ConsumptionForm formProps={formProps} />
    </Edit>
  );
};
