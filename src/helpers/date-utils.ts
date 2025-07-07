import dayjs from 'dayjs';

/**
 * @param date
 * @returns
 */
export const formatTableDate = (
  date: string | Date | null | undefined,
): string => {
  if (!date) return '-';
  return dayjs(date).format('MMM DD, YYYY');
};

/**
 * @param date
 * @returns
 */
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return '';
  return dayjs(date).format('MMM DD, YYYY');
};
