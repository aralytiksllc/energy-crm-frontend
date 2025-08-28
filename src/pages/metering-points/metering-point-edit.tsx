// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';

// Internal
import { Edit } from '@/components/edit';
import { MeteringPointForm } from './components/metering-point-form';

export type MeteringPointEditProps = {};

export const MeteringPointEdit: React.FC<MeteringPointEditProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm({
    resource: 'metering-points',
    action: 'edit',
    redirect: false,
  });

  return (
    <Edit
      resource="metering-points"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
      breadcrumb={false}
      goBack={false}
    >
      <MeteringPointForm formProps={formProps} />
    </Edit>
  );
};
