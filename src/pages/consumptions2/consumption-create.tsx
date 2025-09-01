// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IConsumptionFile } from '@/interfaces/consumptions';
import { Create } from '@/components/create';
import { ConsumptionForm } from './components/consumption-form';

export type ConsumptionCreateProps = {};

export const ConsumptionCreate: React.FC<ConsumptionCreateProps> = () => {
  const { formLoading, formProps, saveButtonProps, redirect } = useForm<
    IConsumptionFile,
    HttpError,
    IConsumptionFile
  >({
    resource: 'consumptions',
    action: 'create',
    redirect: false,
    successNotification(data: any, values, resource) {
      console.log(data, values, resource);

      if (data.data.errors) {
        return {
          message: 'The CSV upload has errors. Please check it and try again.',
          type: 'error',
        };
      }


      redirect('list');

      return {
        message: 'Consumption created successfully',
        type: 'success',
      };
    },
  });

  return (
    <Create
      title="Create Consumption"
      resource="consumptions"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <ConsumptionForm formProps={formProps} />
    </Create>
  );
};
