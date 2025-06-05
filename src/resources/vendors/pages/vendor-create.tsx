import * as React from 'react';
import { Create, useForm } from '@refinedev/antd';
import { VendorForm } from '../components/vendor-form';
import { IVendor } from '../types';

export interface VendorCreateProps {}

export const VendorCreate: React.FC<VendorCreateProps> = () => {
  const { formProps, saveButtonProps } = useForm<IVendor>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <VendorForm formProps={formProps} />
    </Create>
  );
};
