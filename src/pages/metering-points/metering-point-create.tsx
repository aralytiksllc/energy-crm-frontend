// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';

// Internal
import { Create } from '@/components/create';
import { MeteringPointForm } from './components/metering-point-form';

export type MeteringPointCreateProps = {};

export const MeteringPointCreate: React.FC<MeteringPointCreateProps> = () => {
  const { formLoading, formProps, saveButtonProps } =
    useForm({
      resource: 'metering-points',
      action: 'create',
      redirect: false,
    });

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
      breadcrumb={false}
      goBack={false}
    >
      <MeteringPointForm formProps={formProps} />
    </Create>
  );
};
