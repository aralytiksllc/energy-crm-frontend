// External dependencies
import * as React from 'react';
import { Popover, Space, Checkbox, Divider, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// Internal dependencies
import type { PopoverSelectProps } from './popover-select.types';

export function PopoverSelect<T>(props: PopoverSelectProps<T>) {
  const {
    options,
    selected,
    onSelect,
    onToggleAll,
    optionKey,
    optionLabel,
    buttonLabel,
  } = props;

  const [open, setOpen] = React.useState(false);

  const selectedMap = React.useMemo(
    () => new Map(selected.map((opt) => [optionKey(opt), opt])),
    [selected, optionKey],
  );

  const allSelected = selected.length === options.length;

  const partiallySelected = selected.length > 0 && !allSelected;

  const renderOption = React.useCallback(
    (opt: T) => {
      const key = optionKey(opt);
      const label = optionLabel(opt);
      return (
        <Checkbox
          key={key}
          checked={selectedMap.has(key)}
          onChange={() => onSelect(opt)}
        >
          {label}
        </Checkbox>
      );
    },
    [optionKey, optionLabel, onSelect, selectedMap],
  );

  const popoverContent = (
    <Space direction="vertical">
      <Checkbox
        checked={allSelected}
        indeterminate={partiallySelected}
        onChange={onToggleAll}
      >
        {allSelected ? 'Deselect All' : 'Select All'}
      </Checkbox>
      <Divider size="small" />
      {options.map(renderOption)}
    </Space>
  );

  return (
    <Popover
      content={popoverContent}
      trigger="click"
      placement="bottomRight"
      onOpenChange={setOpen}
      open={open}
    >
      <Button>
        {buttonLabel ?? 'Select'} <DownOutlined />
      </Button>
    </Popover>
  );
}
