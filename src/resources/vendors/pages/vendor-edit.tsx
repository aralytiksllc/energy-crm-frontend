import * as React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { VendorForm } from '../components/vendor-form';
import { IVendor } from '../types';

export interface VendorEditProps {}

export const VendorEdit: React.FC<VendorEditProps> = () => {
  const { formProps, saveButtonProps } = useForm<IVendor>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <VendorForm formProps={formProps} />
    </Edit>
  );
};
