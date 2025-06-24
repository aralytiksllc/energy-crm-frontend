// External dependencies
import * as React from 'react';
import { Select } from 'antd';
import { useSelect } from '@refinedev/antd';
import type { BaseRecord, HttpError } from '@refinedev/core';

// Internal dependencies
import type { RemoteSelectProps } from './remote-select.types';

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
