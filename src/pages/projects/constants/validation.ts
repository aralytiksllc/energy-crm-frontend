import { Rule } from 'antd/es/form';

export const rules: Record<string, Rule[] | any> = {
  // Basic fields
  name: [
    { required: true, message: 'Project name is required' },
    { min: 2, message: 'Project name must be at least 2 characters' },
    { max: 100, message: 'Project name cannot exceed 100 characters' },
  ],

  description: [
    { max: 2000, message: 'Description cannot exceed 2000 characters' },
  ],

  clientName: [
    { max: 100, message: 'Client name cannot exceed 100 characters' },
  ],

  category: [{ max: 50, message: 'Category cannot exceed 50 characters' }],

  status: [{ required: true, message: 'Project status is required' }],

  priority: [{ required: true, message: 'Project priority is required' }],

  budget: [
    {
      validator: async (_: any, value: any) => {
        if (value === null || value === undefined || value === '') {
          return Promise.reject(new Error('Budget is required'));
        }
        const numValue = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(numValue) || numValue < 0) {
          return Promise.reject(new Error('Budget must be a positive number'));
        }
      },
    },
  ],

  startDate: [{ required: true, message: 'Start date is required' }],

  deadline: [
    {
      validator: async (_: any, value: any, context: any) => {
        const startDate = context.getFieldValue?.('startDate');
        if (value && startDate && value.isBefore(startDate)) {
          return Promise.reject(
            new Error('Deadline cannot be before start date'),
          );
        }
      },
    },
  ],

  endDate: [
    {
      validator: async (_: any, value: any, context: any) => {
        const startDate = context.getFieldValue?.('startDate');
        if (value && startDate && value.isBefore(startDate)) {
          return Promise.reject(
            new Error('End date cannot be before start date'),
          );
        }
      },
    },
  ],

  technologies: [
    {
      validator: async (_: any, value: string[]) => {
        if (value && value.length > 20) {
          return Promise.reject(new Error('Maximum 20 technologies allowed'));
        }
      },
    },
  ],

  tags: [
    {
      validator: async (_: any, value: string[]) => {
        if (value && value.length > 10) {
          return Promise.reject(new Error('Maximum 10 tags allowed'));
        }
      },
    },
  ],
};
