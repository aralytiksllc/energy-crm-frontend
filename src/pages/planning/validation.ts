import type { Rule } from 'antd/es/form';

export const planningValidationRules = {
  user: [
    {
      required: true,
      message: 'Please select a user to assign to this planning',
    },
  ] as Rule[],

  project: [
    {
      required: true,
      message: 'Please select a project for this assignment',
    },
  ] as Rule[],

  startDate: [
    {
      required: true,
      message: 'Please select when this assignment should start',
    },
  ] as Rule[],

  endDate: [
    {
      required: false,
    },
    ({ getFieldValue }) => ({
      validator: async (_, value) => {
        if (!value) return Promise.resolve();

        const startDate = getFieldValue('startDate');

        if (startDate && value && value.isBefore(startDate)) {
          return Promise.reject(new Error('End date must be after start date'));
        }

        return Promise.resolve();
      },
    }),
  ] as Rule[],

  allocatedHours: [
    {
      required: true,
      message: 'Please enter allocated hours',
    },
    {
      type: 'number',
      min: 0.5,
      max: 24,
      message: 'Hours must be between 0.5 and 24',
    },
  ] as Rule[],

  status: [
    {
      required: true,
      message: 'Please select a status',
    },
  ] as Rule[],

  priority: [
    {
      required: true,
      message: 'Please select a priority',
    },
  ] as Rule[],

  notes: [
    {
      required: false,
      max: 500,
      message: 'Notes cannot exceed 500 characters',
    },
  ] as Rule[],

  dateRange: [
    {
      required: true,
      message: 'Please select a date range',
    },
  ] as Rule[],
};
