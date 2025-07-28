// External dependencies
import React from 'react';
import { Select } from 'antd';
import type { BaseRecord } from '@refinedev/core';

// Internal dependencies
import type { UserSelectProps } from './user-select.types';

export const UserSelect = <T extends BaseRecord>(props: UserSelectProps<T>) => {
  const {
    entities,
    optionValue,
    optionLabel,
    renderOption,
    renderLabel,
    searchText,
    loading,
    ...restProps
  } = props;

  const options = entities.map((item: T) => {
    const value = optionValue(item);
    const label = optionLabel(item);
    const searchValue = searchText ? searchText(item) : label;

    return {
      value,
      label: renderOption ? renderOption(item) : label,
      searchText: searchValue,
      title: searchValue,
    };
  });

  const labelRender = (option: any) => {
    const selectedItem = entities.find(
      (item: T) => optionValue(item) === option.value,
    );
    if (selectedItem && renderLabel) {
      return renderLabel(selectedItem);
    }
    return option.label;
  };

  return (
    <Select
      loading={loading}
      options={options}
      labelRender={renderLabel ? labelRender : undefined}
      filterOption={(input, option) =>
        (option?.searchText ?? '').toLowerCase().includes(input.toLowerCase())
      }
      {...restProps}
    />
  );
};
