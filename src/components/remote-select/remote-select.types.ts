// External dependencies
import type { SelectProps } from 'antd';
import type { UseSelectProps, BaseRecord, HttpError } from '@refinedev/core';

// Internal dependencies

type RequiredSelectProps<T> = Pick<
  UseSelectProps<T, HttpError, T>,
  'resource' | 'optionValue' | 'optionLabel'
>;

export interface RemoteSelectProps<T extends BaseRecord>
  extends SelectProps,
    RequiredSelectProps<T> {}
