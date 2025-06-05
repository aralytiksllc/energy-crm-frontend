import { Rule } from 'antd/lib/form';
import { IVendor } from '../types';

export const rules: Partial<Record<keyof IVendor, Rule[]>> = {
  name: [
    {
      required: true,
      message: 'Name is required',
    },
  ],
  description: [
    {
      required: true,
      message: 'Description is required',
    },
  ],
  contactEmail: [
    {
      required: true,
      message: 'Contact email is required',
    },
    {
      type: 'email',
      message: 'Please enter a valid email',
    },
  ],
  contactPhone: [
    {
      required: true,
      message: 'Contact phone is required',
    },
  ],
  website: [
    {
      required: true,
      message: 'Website is required',
    },
    {
      type: 'url',
      message: 'Please enter a valid URL',
    },
  ],
  isActive: [
    {
      required: true,
      message: 'Active status is required',
    },
  ],
} as const;
