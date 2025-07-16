// External dependencies
import React from 'react';
import { DatePicker, Space, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';

// Internal dependencies
import type { DateRangeFilterProps } from './date-range-filter.types';

const { RangePicker } = DatePicker;
const { Text } = Typography;

export const DateRangeFilter: React.FC<DateRangeFilterProps> = (props) => {
  const {
    value,
    onChange,
    style,
    label,
    placeholder,
    format,
    width,
    showIcon,
    iconColor,
    labelColor,
    allowClear,
    allowEmpty,
    autoSetEndDate,
  } = props;

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (!dates) {
      onChange?.({
        startDate: null,
        endDate: null,
      });
      return;
    }

    const [startDate, endDate] = dates;
    const actualEndDate = endDate || (autoSetEndDate ? dayjs() : null);

    onChange?.({
      startDate,
      endDate: actualEndDate,
    });
  };

  const dateValue: [Dayjs | null, Dayjs | null] | undefined = value?.startDate
    ? [value.startDate, value.endDate]
    : undefined;

  return (
    <Space align="center" style={style}>
      {showIcon && <CalendarOutlined style={{ color: iconColor }} />}
      {label && (
        <Text strong style={{ color: labelColor }}>
          {label}
        </Text>
      )}
      <RangePicker
        value={dateValue}
        onChange={handleDateChange}
        allowClear={allowClear}
        placeholder={placeholder}
        format={format}
        allowEmpty={allowEmpty}
        style={{ width }}
      />
    </Space>
  );
};
