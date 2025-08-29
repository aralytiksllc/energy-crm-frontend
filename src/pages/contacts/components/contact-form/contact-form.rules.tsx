// External
import type { Rule } from 'antd/es/form';

// Internal

export const rules: Record<string, Rule[]> = {
  name: [
    { required: true, message: 'Name is required' },
    { whitespace: true, message: 'Name cannot be empty' },
    { max: 255, message: 'Max 255 characters' },
  ],

  email: [
    { required: true, message: 'Email is required' },
    { type: 'email', message: 'Enter a valid email' },
    { max: 255, message: 'Max 255 characters' },
  ],

  phone: [{ max: 50, message: 'Max 50 characters' }],

  type: [{ max: 100, message: 'Max 100 characters' }],

  role: [{ max: 100, message: 'Max 100 characters' }],

  status: [{ required: true, message: 'Status is required' }],

  customerId: [{ required: true, message: 'Customer ID is required' }],
};
