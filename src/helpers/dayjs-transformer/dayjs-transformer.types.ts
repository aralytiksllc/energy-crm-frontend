// External dependencies
import type { Dayjs } from 'dayjs';

// Internal dependencies

export type DateInputValue = string | Date | undefined | null;
export type DayjsInputValue = Dayjs | undefined | null;

export type ValueProps = {
  value: Dayjs | undefined;
};

export type NormalizedDate = string | undefined;
export type NativeDate = Date | undefined;
