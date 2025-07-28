import type { CSSProperties } from 'react';
import type { Dayjs } from 'dayjs';

export interface DateRange {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export interface DateRangeFilterProps {
  value?: DateRange;
  onChange?: (dateRange: DateRange) => void;
  style?: CSSProperties;
  label?: string;
  placeholder: [string, string];
  format: string;
  width: number;
  showIcon?: boolean;
  iconColor?: string;
  labelColor?: string;
  allowClear?: boolean;
  allowEmpty?: [boolean, boolean];
  autoSetEndDate?: boolean;
}
