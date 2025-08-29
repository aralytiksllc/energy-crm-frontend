// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IMeteringPoint } from '@/interfaces/metering-points';
import { Create } from '@/components/create';
import { MeteringPointForm } from './components/metering-point-form';

export type MeteringPointCreateProps = {};

export const MeteringPointCreate: React.FC<MeteringPointCreateProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm<
    IMeteringPoint,
    HttpError,
    IMeteringPoint
  >({
    resource: 'metering-points',
    action: 'create',
    redirect: 'list',
  });

  return (
    <Create
      title="Create Metering Point"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
      // breadcrumb={false}
      // goBack={false}
    >
      <MeteringPointForm formProps={formProps} />
    </Create>
  );
};
