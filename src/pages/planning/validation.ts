import type { Rule } from 'antd/es/form';

export const planningValidationRules = {
  title: [
    {
      required: true,
      message: 'Please enter a title for the planning',
    },
    {
      max: 255,
      message: 'Title cannot exceed 255 characters',
    },
  ] as Rule[],

  description: [
    {
      required: false,
      max: 1000,
      message: 'Description cannot exceed 1000 characters',
    },
  ] as Rule[],

  assignedUserId: [
    {
      required: true,
      message: 'Please select a user to assign to this planning',
    },
  ] as Rule[],

  projectId: [
    {
      required: true,
      message: 'Please select a project for this planning',
    },
  ] as Rule[],

  startDate: [
    {
      required: true,
      message: 'Please select when this planning should start',
    },
  ] as Rule[],

  endDate: [
    {
      required: true,
      message: 'Please select when this planning should end',
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

  notes: [
    {
      required: false,
      max: 1000,
      message: 'Notes cannot exceed 1000 characters',
    },
  ] as Rule[],

  isCompleted: [
    {
      required: false,
    },
  ] as Rule[],

  completedDate: [
    {
      required: false,
    },
    ({ getFieldValue }) => ({
      validator: async (_, value) => {
        if (!value) return Promise.resolve();

        const isCompleted = getFieldValue('isCompleted');
        const endDate = getFieldValue('endDate');

        if (isCompleted && !value) {
          return Promise.reject(
            new Error('Completed date is required when marking as completed'),
          );
        }

        if (value && endDate && value.isBefore(endDate)) {
          return Promise.reject(
            new Error('Completed date cannot be before end date'),
          );
        }

        return Promise.resolve();
      },
    }),
  ] as Rule[],
};
