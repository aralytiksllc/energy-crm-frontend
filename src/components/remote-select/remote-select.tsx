import * as React from 'react';
import { Select, SelectProps } from 'antd';
import { useSelect } from '@refinedev/antd';
import { UseSelectProps, BaseRecord, HttpError } from '@refinedev/core';

type RequiredSelectProps<T> = Pick<
  UseSelectProps<T, HttpError, T>,
  'resource' | 'optionValue' | 'optionLabel'
>;

interface RemoteSelectProps<T extends BaseRecord>
  extends SelectProps,
    RequiredSelectProps<T> {}

export const RemoteSelect = <T extends BaseRecord>(
  props: RemoteSelectProps<T>,
) => {
  const { resource, optionValue, optionLabel, ...restProps } = props;

  const { selectProps } = useSelect<T, HttpError, T>({
    resource,
    optionValue,
    optionLabel,
  });

  return <Select {...selectProps} {...restProps} />;
};
