import { Rule } from 'antd/es/form';

export const rules: Record<string, Rule[] | never> = {
  title: [
    { required: true, message: 'Please enter a title' },
    { min: 2, message: 'Title must be at least 2 characters' },
  ],
};
