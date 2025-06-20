import React from 'react';
import { DatePicker, Space, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;
const { Text } = Typography;

export interface DateRange {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface DateFilterProps {
  value?: DateRange;
  onChange?: (dateRange: DateRange) => void;
  style?: React.CSSProperties;
}

const DateFilter: React.FC<DateFilterProps> = ({ value, onChange, style }) => {
  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (!dates) {
      onChange?.({
        startDate: null,
        endDate: null,
      });
      return;
    }

    const [startDate, endDate] = dates;

    // If only start date is provided, set end date to today
    const actualEndDate = endDate || dayjs();

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
      <CalendarOutlined style={{ color: '#1890ff' }} />
      <Text strong style={{ color: '#666' }}>
        Filter by Date:
      </Text>
      <RangePicker
        value={dateValue}
        onChange={handleDateChange}
        allowClear
        placeholder={['Start Date', 'End Date']}
        format="YYYY-MM-DD"
        allowEmpty={[false, true]} // Allow end date to be empty
        style={{ width: 280 }}
      />
    </Space>
  );
};

export default DateFilter;
