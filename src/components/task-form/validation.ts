import type { Rule } from 'antd/es/form';
import type { TaskFormValues } from './task-form.types';

const taskFormValidation = {
  title: [
    { required: true, message: 'Task title is required' },
    { min: 2, message: 'Title must be at least 2 characters' },
    { max: 100, message: 'Title cannot exceed 100 characters' },
    { whitespace: true, message: 'Title cannot be only whitespace' },
  ] as Rule[],

  type: [{ required: true, message: 'Please select a task type' }] as Rule[],

  priority: [{ required: true, message: 'Priority is required' }] as Rule[],

  dueDate: [
    { required: true, message: 'Due date is required' },
    {
      validator: (_, value) => {
        if (!value) return Promise.reject();
        const now = new Date();
        const dueDate = new Date(value);
        if (dueDate < now) {
          return Promise.reject(new Error('Due date cannot be in the past'));
        }
        return Promise.resolve();
      },
    },
  ] as Rule[],

  description: [
    { max: 2000, message: 'Description cannot exceed 2000 characters' },
  ] as Rule[],
};

export const validateTaskForm = (values: Partial<TaskFormValues>): string[] => {
  const errors: string[] = [];

  if (!values.title?.trim()) {
    errors.push('Task title is required');
  }

  if (!values.priority) {
    errors.push('Priority is required');
  }

  if (!values.dueDate) {
    errors.push('Due date is required');
  } else {
    const now = new Date();
    const dueDate = new Date(values.dueDate);
    if (dueDate < now) {
      errors.push('Due date cannot be in the past');
    }
  }

  return errors;
};

export default taskFormValidation;
