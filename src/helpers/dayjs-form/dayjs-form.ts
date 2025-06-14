// External imports
import dayjs, { Dayjs } from 'dayjs';

export type DateInputValue = string | number | null | undefined;

export type DayjsInputValue = Dayjs | null | undefined;

export class DayjsForm {
  static getValueProps(value: DateInputValue): { value: Dayjs | undefined } {
    return {
      value: value ? dayjs(value) : undefined,
    };
  }

  static normalize(value: DayjsInputValue): string | undefined {
    return value?.format('YYYY-MM-DD');
  }
}
