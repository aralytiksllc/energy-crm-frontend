// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';

// Internal
import { Create } from '@/components/create';
import { MeteringPointsForm } from './components/metering-points-form';

export type MeteringPointsCreateProps = {};

export const MeteringPointsCreate: React.FC<MeteringPointsCreateProps> = () => {
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
      <MeteringPointsForm formProps={formProps} />
    </Create>
  );
};
