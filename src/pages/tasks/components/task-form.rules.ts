import type { Rule } from 'antd/lib/form';
import { Task } from '@interfaces/task';

type TaskFormRules = Partial<Record<keyof Task, Rule[]>>;

export const rules: TaskFormRules = {
  projectId: [
    {
      required: true,
      message: 'Please select a project',
    },
  ],
  title: [
    {
      required: true,
      message: 'Please enter a title',
    },
  ],
  type: [
    {
      required: true,
      message: 'Please select a type',
    },
  ],
  startDate: [
    {
      validator: async (_: any, value: any, context: any) => {
        if (!value) return Promise.resolve();

        const dueDate = context.getFieldValue?.('dueDate');
        if (dueDate && value && value.isAfter(dueDate)) {
          return Promise.reject(
            new Error('Start date cannot be after due date'),
          );
        }

        return Promise.resolve();
      },
    },
  ],
  dueDate: [
    {
      validator: async (_: any, value: any, context: any) => {
        if (!value) return Promise.resolve();

        const startDate = context.getFieldValue?.('startDate');
        if (startDate && value && value.isBefore(startDate)) {
          return Promise.reject(
            new Error('Due date cannot be before start date'),
          );
        }

        return Promise.resolve();
      },
    },
  ],
};
