import { useState, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import { getDateRangeFromFilter, filterDataByDateRange } from '../utils';

export const useDateFilter = <T extends { createdAt: string }>(data: T[]) => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [quickFilter, setQuickFilter] = useState<string>('month');

  const currentDateRange = useMemo(
    () => getDateRangeFromFilter(quickFilter, dateRange),
    [quickFilter, dateRange],
  );

  const filteredData = useMemo(
    () => filterDataByDateRange(data, currentDateRange),
    [data, currentDateRange],
  );

  const handleQuickFilterChange = (value: string) => {
    setQuickFilter(value);
    if (value !== 'custom') {
      setDateRange(null);
    }
  };

  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates ? [dates[0], dates[1]] : null);
    setQuickFilter('custom');
  };

  return {
    quickFilter,
    dateRange,
    filteredData,
    handleQuickFilterChange,
    handleDateRangeChange,
  };
};
