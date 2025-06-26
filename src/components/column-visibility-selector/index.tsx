import React from 'react';
import { Button, Checkbox, Dropdown } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useColumnVisibilitySelectorStyles } from './styles';

export interface ColumnOption {
  value: string;
  label: string;
  disableCustom?: boolean;
}

interface ColumnVisibilitySelectorProps {
  options: ColumnOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ColumnVisibilitySelector({
  options,
  selected,
  onChange,
  placeholder = 'Select Columns',
  disabled = false,
}: ColumnVisibilitySelectorProps) {
  const { styles } = useColumnVisibilitySelectorStyles();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const allSelected = selected.length === options.length;
  const someSelected = selected.length > 0 && selected.length < options.length;

  const handleSelectAllChange = (e: any) => {
    if (e.target.checked) {
      const allValues = options.map((option) => option.value);
      onChange(allValues);
    } else {
      onChange([]);
    }
  };

  const handleOptionChange = (optionValue: string) => {
    const newSelected = selected.includes(optionValue)
      ? selected.filter((val) => val !== optionValue)
      : [...selected, optionValue];
    onChange(newSelected);
  };

  const dropdownRender = () => (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownHeader}>
        <div className={styles.selectAllContainer}>
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={handleSelectAllChange}
            disabled={disabled}
          >
            Select All
          </Checkbox>
        </div>
      </div>
      <div className={styles.optionsContainer}>
        {options.map((option) => (
          <div
            key={option.value}
            className={styles.optionItem}
            onClick={() =>
              !disabled &&
              !option.disableCustom &&
              handleOptionChange(option.value)
            }
          >
            <Checkbox
              checked={selected.includes(option.value)}
              onChange={(e) => {
                e.stopPropagation();
              }}
              disabled={disabled || option.disableCustom}
            />
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Dropdown
      open={dropdownOpen}
      onOpenChange={setDropdownOpen}
      popupRender={dropdownRender}
      trigger={['click']}
      placement="bottomRight"
      disabled={disabled}
    >
      <Button
        className={styles.button}
        icon={<SettingOutlined />}
        disabled={disabled}
      >
        {placeholder}
      </Button>
    </Dropdown>
  );
}

export default ColumnVisibilitySelector;
