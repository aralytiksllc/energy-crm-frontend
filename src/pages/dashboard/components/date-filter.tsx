import React from 'react';
import { DateRangeFilter, type DateRange } from '@components/date-range-filter';

interface DateFilterProps {
  value?: DateRange;
  onChange?: (dateRange: DateRange) => void;
  style?: React.CSSProperties;
}

const DateFilter: React.FC<DateFilterProps> = ({ value, onChange, style }) => {
  return (
    <DateRangeFilter
      value={value}
      onChange={onChange}
      style={style}
      label="Filter by Date:"
      placeholder={['Start Date', 'End Date']}
      format="YYYY-MM-DD"
      width={280}
      showIcon={true}
      iconColor="#1890ff"
      labelColor="#666"
      allowClear={true}
      allowEmpty={[false, true]}
      autoSetEndDate={true}
    />
  );
};

export default DateFilter;
