import React from 'react';
import { Switch } from 'antd';
import type { SwitchProps } from 'antd';

export interface ActiveSwitchProps
  extends Omit<SwitchProps, 'checkedChildren' | 'unCheckedChildren'> {
  label?: string;
  showLabels?: boolean;
  checkedLabel?: string;
  uncheckedLabel?: string;
}

export const ActiveSwitch: React.FC<ActiveSwitchProps> = ({
  label = 'Active Status',
  showLabels = true,
  checkedLabel = 'Active',
  uncheckedLabel = 'Inactive',
  ...switchProps
}) => {
  const switchChildren = showLabels
    ? { checkedChildren: checkedLabel, unCheckedChildren: uncheckedLabel }
    : {};

  return <Switch {...switchChildren} {...switchProps} />;
};
