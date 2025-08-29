// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IMeteringPoint } from '@/interfaces/metering-points';
import { Edit } from '@/components/edit';
import { MeteringPointForm } from './components/metering-point-form';

export type MeteringPointEditProps = {};

export const MeteringPointEdit: React.FC<MeteringPointEditProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm<
    IMeteringPoint,
    HttpError,
    IMeteringPoint
  >({
    resource: 'metering-points',
    action: 'edit',
    redirect: 'list',
  });

  return (
    <Edit
      resource="metering-points"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
      // breadcrumb={false}
      // goBack={false}
    >
      <MeteringPointForm formProps={formProps} />
    </Edit>
  );
};
