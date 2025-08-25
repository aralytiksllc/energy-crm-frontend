// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import { useParams } from 'react-router';

// Internal
import { Edit } from '@/components/edit';
import { MeteringPointsForm } from './components/metering-points-form';

export type MeteringPointsEditProps = {};

export const MeteringPointsEdit: React.FC<MeteringPointsEditProps> = () => {
  const { customerId } = useParams();

  const { formLoading, formProps, saveButtonProps } = useForm({
    resource: 'metering-points',
    action: 'edit',
    id: customerId,
    redirect: false,
  });

  return (
    <Edit
      resource="metering-points"
      saveButtonProps={saveButtonProps}
      recordItemId={customerId}
      isLoading={formLoading}
      breadcrumb={false}
      goBack={false}
    >
      <MeteringPointsForm formProps={formProps} />
    </Edit>
  );
};
