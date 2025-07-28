import React from 'react';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from '@ant-design/icons';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface TrendData {
  trend: TrendDirection;
  change: number;
}

export interface TrendConfig {
  isPositiveGood?: boolean;
  showPercentage?: boolean;
  precision?: number;
}

/**
 * Calculate percentage change between two values
 */
export const calculatePercentageChange = (
  current: number,
  previous: number,
): number => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / previous) * 100;
};

/**
 * Determine trend direction based on percentage change
 */
export const getTrendDirection = (
  percentageChange: number,
  threshold = 0,
): TrendDirection => {
  if (Math.abs(percentageChange) <= threshold) return 'neutral';
  return percentageChange > 0 ? 'up' : 'down';
};

/**
 * Get appropriate icon component for trend direction
 */
export const getTrendIcon = (trend: TrendDirection) => {
  switch (trend) {
    case 'up':
      return ArrowUpOutlined;
    case 'down':
      return ArrowDownOutlined;
    case 'neutral':
    default:
      return MinusOutlined;
  }
};

/**
 * Get appropriate color for trend direction
 */
export const getTrendColor = (
  trend: TrendDirection,
  config: TrendConfig = {},
): string => {
  const { isPositiveGood = true } = config;

  if (trend === 'neutral') return 'var(--color-trend-neutral)';

  if (isPositiveGood) {
    return trend === 'up' ? 'var(--color-trend-up)' : 'var(--color-trend-down)';
  } else {
    return trend === 'up' ? 'var(--color-trend-down)' : 'var(--color-trend-up)';
  }
};

/**
 * Format trend change as percentage string
 */
export const formatTrendChange = (
  change: number,
  config: TrendConfig = {},
): string => {
  const { showPercentage = true, precision = 1 } = config;
  const formattedChange = change.toFixed(precision);
  const sign = change > 0 ? '+' : '';
  const suffix = showPercentage ? '%' : '';

  return `${sign}${formattedChange}${suffix}`;
};

/**
 * Create trend data from current and previous values
 */
export const createTrendData = (
  current: number,
  previous: number,
  threshold = 0,
): TrendData => {
  const change = calculatePercentageChange(current, previous);
  const trend = getTrendDirection(change, threshold);

  return {
    trend,
    change,
  };
};

/**
 * Get trend styling properties (icon, color, formatted change)
 */
export const getTrendStyling = (
  trendData: TrendData,
  config: TrendConfig = {},
) => {
  const IconComponent = getTrendIcon(trendData.trend);
  return {
    icon: React.createElement(IconComponent),
    color: getTrendColor(trendData.trend, config),
    formattedChange: formatTrendChange(trendData.change, config),
    trend: trendData.trend,
  };
};
