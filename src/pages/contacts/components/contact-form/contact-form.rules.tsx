// External
import type { Rule } from 'antd/es/form';

// Internal

export const contactFormRules: Record<string, Rule[]> = {
  contactName: [
    { required: true, whitespace: true, message: 'Contact name is required' },
    { max: 512, message: 'Max 512 characters' },
  ],

  peakLoadKw: [{ type: 'number', message: 'Must be a number' }],

  weatherDataLinkage: [{ max: 50, message: 'Max 50 characters' }],
};
