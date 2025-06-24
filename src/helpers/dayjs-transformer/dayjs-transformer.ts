// External imports
import dayjs from 'dayjs';

// Internal dependencies
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
}
