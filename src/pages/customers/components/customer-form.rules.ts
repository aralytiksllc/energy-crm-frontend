import type { Rule } from 'antd/lib/form';
import type { Customer } from '../types/customer.types';

type CustomerFormRules = Partial<Record<keyof Customer, Rule[]>>;

export const rules: CustomerFormRules = {
  name: [
    {
      required: true,
      message: 'Please enter the customer name',
    },
  ],
};
