// External
import dayjs from 'dayjs';

// Internal
import type {
  DateInputValue,
  DayjsInputValue,
  ValueProps,
  NormalizedDate,
  NativeDate,
} from './dayjs-transformer.types';

export class DayjsTransformer {
  static toValueProps(input: DateInputValue): ValueProps {
    return {
      value: input ? dayjs(input) : undefined,
    };
  }

  static toNormalizedDate(input: DayjsInputValue): NormalizedDate {
    return input?.format('YYYY-MM-DD');
  }

  static toNativeDate(input: DayjsInputValue): NativeDate {
    return input ? input.toDate() : undefined;
  }

  static formatToShortDate(date: string | Date | null | undefined): string {
    if (!date) return '';
    return dayjs(date).format('MMM DD, YYYY');
  }

  static formatToLongDate(date: string | Date | null | undefined): string {
    if (!date) return '';
    return dayjs(date).format('dddd, MMMM DD, YYYY');
  }
}
